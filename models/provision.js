const { Schema, model } = require('mongoose')

const provisionSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
})

module.exports = model('Provision', provisionSchema)
