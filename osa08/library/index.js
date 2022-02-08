const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const Book = require('./models/book')
const Author = require('./models/author')

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
  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
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
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const allBooks = await Book.find({})
        .populate('author', { id: 1, name: 1, born: 1 })
      return allBooks
    },
    allAuthors: async () => {
      const fetchedAuthors = await Author.find({})
      return fetchedAuthors
    }
  },
  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: root._id })
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
          author: author._id
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
    editAuthor: async (root, args) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})