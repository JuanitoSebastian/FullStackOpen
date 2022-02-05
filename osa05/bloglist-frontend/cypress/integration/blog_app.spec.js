const testingUserMarcos = {
  username: 'marcos',
  name: 'Marcos Serrano',
  password: 'escobilla'
}

const testingUserGuille = {
  username: 'guille',
  name: 'Guille Serrano',
  password: 'la_leche'
}

const blogsToCreate = [
  {
    title: 'How to install iOS 15.4 beta and try out Face ID With a Mask and Universal Control',
    author: 'Michael Potuck',
    url: 'https://9to5mac.com/2022/01/28/how-to-install-ios-15-beta/'
  },
  {
    title: 'Here’s the one iOS 15 feature we’re still waiting on Apple to release',
    author: 'Chance Miller',
    url: 'https://9to5mac.com/2022/01/30/digital-ids-in-apple-wallet-release-date/'
  },
  {
    title: 'HELPPOA JA HUOLETONTA HIIHTOA',
    author: 'Axa Sorjanen',
    url: 'https://tekniikanmaailma.fi/lehti/20b-2021/tm-vertailu-karvapohjasukset-helppoa-ja-huoletonta-hiihtoa/'
  }
]

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username: username, password: password
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlogPost', (title, author, url) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      title: title,
      author: author,
      url: url
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

describe('Blogs app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', testingUserMarcos)
    cy.request('POST', 'http://localhost:3003/api/users', testingUserGuille)
    cy.visit('http://localhost:3000')
  })

  it('front page is displayed correctly', function() {
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('Login')
  })

  describe('Logging in', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(testingUserMarcos.username)
      cy.get('#password').type(testingUserMarcos.password)
      cy.get('#login-button').click()

      cy.contains(`Hello ${testingUserMarcos.username}! You have logged in.`)
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type(testingUserMarcos.username)
      cy.get('#password').type('bad_password1')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in ', function() {
    beforeEach(function() {
      cy.login(testingUserMarcos.username, testingUserMarcos.password)
    })

    it('form for creating blogs can be opened', function() {
      cy.get('#show-blog-form-button').click()
      cy.contains('Title:')
      cy.contains('Author:')
      cy.contains('Url:')
      cy.contains('Add blog')
      cy.contains('Cancel')
    })

    it('a blog post can be added', function() {
      cy.get('#show-blog-form-button').click()
      cy.get('#title').type(blogsToCreate[0].title)
      cy.get('#author').type(blogsToCreate[0].author)
      cy.get('#url').type(blogsToCreate[0].url)
      cy.get('#submit-blog-button').click()

      cy.contains(`${blogsToCreate[0].title} by ${blogsToCreate[0].author}`)
      cy.contains('View')
    })
  })

  describe('After adding a blog post ', function() {
    beforeEach(function() {
      cy.login(testingUserMarcos.username, testingUserMarcos.password)

      cy.createBlogPost(blogsToCreate[0].title, blogsToCreate[0].author, blogsToCreate[0].url)
    })

    it('it can be liked', function() {
      cy.contains('View').click()
      cy.contains('0 likes')
      cy.contains('Like').click()
      cy.contains('1 likes')
    })

    it('it can be deleted', function() {
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.contains(`${blogsToCreate[0].title} was removed`)
    })

    it('it can not be deleted by someone else', function() {
      cy.contains('Log out').click()
      cy.login(testingUserGuille.username, testingUserGuille.password)

      cy.contains(`${blogsToCreate[0].title} by ${blogsToCreate[0].author}`)
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.contains(`Could not delete ${blogsToCreate[0].title}`)
    })
  })

  describe('After adding multiple blog posts ', function() {
    beforeEach(function() {
      cy.login(testingUserMarcos.username, testingUserMarcos.password)

      cy.createBlogPost(blogsToCreate[0].title, blogsToCreate[0].author, blogsToCreate[0].url)
      cy.createBlogPost(blogsToCreate[1].title, blogsToCreate[1].author, blogsToCreate[1].url)
      cy.createBlogPost(blogsToCreate[2].title, blogsToCreate[2].author, blogsToCreate[2].url)
    })

    it('Blogs are sorted by number of likes', function() {
      cy.get('button#expand-blog-button').click({ multiple: true })

      cy.get('.blog-post').eq(0).contains(blogsToCreate[0].title)
      cy.get('.blog-post').eq(1).contains(blogsToCreate[1].title)
      cy.get('.blog-post').eq(2).contains(blogsToCreate[2].title)

      cy.get('button#like-blog-button').eq(2).click()

      cy.get('.blog-post').eq(0).contains(blogsToCreate[2].title)
      cy.get('.blog-post').eq(1).contains(blogsToCreate[0].title)
      cy.get('.blog-post').eq(2).contains(blogsToCreate[1].title)

      cy.get('button#like-blog-button').eq(2).click()
      cy.get('button#like-blog-button').eq(1).click()

      cy.get('.blog-post').eq(0).contains(blogsToCreate[1].title)

      cy.get('button#like-blog-button').eq(2).click()
      cy.get('button#like-blog-button').eq(2).click()
      cy.get('button#like-blog-button').eq(1).click()

      cy.get('.blog-post').eq(0).contains(blogsToCreate[0].title)
    })
  })
})