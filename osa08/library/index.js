const { ApolloServer, gql, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
    id: ID!
  },
  type Author {
    name: String!,
    born: Int,
    bookCount: Int!,
    id: ID!
  },
  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  },
  type Token {
    value: String!
  },
  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!,
    me: User,
    allGenres: [String!]!
  },
  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!,
      favoriteGenre: String!
    ): User,
    login(
      username: String!,
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const allBooks = await Book.find({})
          .populate('author', { id: 1, name: 1, born: 1 })
        return allBooks
      }

      let authorToDisplay

      if (args.author) {
        authorToDisplay = await Author.findOne({ name: args.author })
      }

      const filters = {
        author: authorToDisplay ? authorToDisplay._id : undefined,
        genres: args.genre
      }

      Object.keys(filters)
        .forEach(key =>
          filters[key] === undefined && delete filters[key]
        )

      const filteredBooks = await Book.find({ ...filters })
        .populate('author', { id: 1, name: 1, born: 1 })
      return filteredBooks
    },
    allAuthors: async () => {
      const fetchedAuthors = await Author.find({})
      return fetchedAuthors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const fetchedBooks = await Book.find({})
      const genres = fetchedBooks.map(book => book.genres).flat()
      const uniqueGenres = [...new Set(genres)]
      return uniqueGenres
    }
  },
  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: root._id })
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error('Please log in to continue')
      }

      let author = await Author.findOne({ name: args.author })

      // Create author if needed
      if (!author) {
        try {
          author = new Author({
            name: args.author
          })
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }

      try {
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres
        })

        const savedBook = await book.save()
        await Book.populate(book, { path: 'author' })
        return savedBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error('Please log in to continue')
      }
      const authorToEdit = await Author.findOne({ name: args.name })
      if (!authorToEdit) {
        throw new UserInputError('Author was not found!')
      }
      authorToEdit.born = args.setBornTo

      try {
        await authorToEdit.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return authorToEdit
    },
    createUser: async (root, args) => {
      try {
        const user = await new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})