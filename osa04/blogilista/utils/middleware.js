const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  switch (error.name) {

  case 'ValidationError':
    return response.status(400).json({
      error: error.message
    })

  case 'NotFoundError':
    return response.status(404).json({
      error: error.message
    })

  case 'JsonWebTokenError':
    return response.status(401).json({
      error: 'Invalid token'
    })

  }

  next(error)
}


const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  } else { request.token = null }

  next()
}


module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor
}