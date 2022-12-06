const { Schema, model } = require('mongoose')

const calendarSchema = Schema({
  date: {
    type: Date,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
})

module.exports = model('Calendar', calendarSchema)
