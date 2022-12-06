const User = require('../../models/user')

// response and logs messages
const successMessage = 'User edited'
const errorMessage = "Can't edit User :"
const serverError = "Can't edit user, please try again later"

module.exports.editUserAddress = async (req, res) => {
  try {
    const paramsId = req.params.id
    const updateObject = {
      ...req.body.postalAddress,
    }
    await User.updateOne(
      { _id: paramsId },
      { $set: { postalAddress: updateObject } }
    ).then((updateResult) => {
      if (updateResult.modifiedCount === 0) {
        console.log(errorMessage, updateResult)
        return res.status(400).json(errorMessage)
      }
      console.log(updateResult, successMessage)
      res.status(201).json(updateResult)
    })
  } catch (error) {
    console.log(serverError, error)
    res.status(500).json(serverError)
  }
}
