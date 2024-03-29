const mongoose = require('mongoose')
const unqiueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.plugin(unqiueValidator)

module.exports = mongoose.model('Author', schema)