const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// email, password, phoneNumber validations

const isValidEmail = (email) => {
  const regexEmail =
    // RFC 5322 regex validation
    /^((\w\w+)[.\-]?)+@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regexEmail.test(email)
}

const isValidPassword = (password) => {
  const regexPassword =
    // Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, at least 8 characters, Can contain special characters
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  return regexPassword.test(password)
}

const isValidPhoneNumber = (phoneNumber) => {
  const regexPhoneNumber =
    // French phone number only
    /^(0|\\+33|0033)[1-9][0-9]{8}$/
  return regexPhoneNumber.test(phoneNumber)
}

const userSchema = Schema(
  {
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      validate: [isValidEmail, 'Please indicate a valid email address'],
    },
    password: {
      type: String,
      trim: true,
      require: true,
      validate: [
        isValidPassword,
        'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, at least 8 characters, Can contain special characters',
      ],
    },
    firstName: {
      type: String,
      require: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      require: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      require: true,
      validate: [isValidPhoneNumber, 'Only French phone number allowed'],
    },
    postalAddress: {
      address: String,
      extendAddress: String,
      number: String,
      postalCode: String,
      city: String,
    },
    bookedDate: {
      _id: String,
      day: String,
      hour: String,
      provision: {
        _id: String,
        name: String,
        price: String,
        time: String,
        overview: String,
        image: String,
      },
    },
  },
  { timeStamp: true }
)

userSchema.pre('save', async function (next) {
  const rounds = 10
  this.password = await bcrypt.hash(this.password, rounds)
  next()
})

userSchema.plugin(uniqueValidator)
module.exports = model('User', userSchema)
