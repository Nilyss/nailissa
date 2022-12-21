const User = require('../../models/user')

// response and logs messages
const successMessage = 'Users find'
const errorMessage = "Can't find Users :"
const serverError = "Can't find users, please try again later"

module.exports.getAllUsers = async (req, res) => {
  try {
    await User.find().then((users) => {
      if (!users) {
        console.log(errorMessage)
        return res.status(400).json(errorMessage)
      }
      console.log(successMessage, users)
      return res.status(200).json(users)
    })
  } catch (error) {
    console.log(serverError)
    return res.status(500).json(serverError)
  }
}
