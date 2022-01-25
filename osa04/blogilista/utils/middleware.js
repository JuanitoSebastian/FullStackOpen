const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error)

  switch (error.name) {

  case 'ValidationError':
    return res.status(400).json({
      error: error.message
    })

  case 'NotFoundError':
    return res.status(404).json({
      error: error.message
    })

  }

  next(error)
}

module.exports = {
  errorHandler,
  unknownEndpoint
}