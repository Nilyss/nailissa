const User = require('../../models/user')
const mongoose = require('mongoose')

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
      return res.status(201).json(updateResult)
    })
  } catch (error) {
    console.log(serverError, error)
    return res.status(500).json(serverError)
  }
}

module.exports.editUserBookedDate = async (req, res) => {
  try {
    const newId = new mongoose.Types.ObjectId()
    const paramsId = req.params.id
    const updateObject = { ...req.body, _id: newId }
    await User.updateOne(
      { _id: paramsId },
      { $set: { bookedDate: updateObject } }
    ).then((updateResult) => {
      if (updateResult.modifiedCount === 0) {
        console.log(errorMessage, updateResult)
        return res.status(400).json(errorMessage)
      }
      console.log(updateResult, successMessage)
      return res.status(201).json(updateResult)
    })
  } catch (error) {
    console.log(error, serverError)
    return res.status(500).json(serverError)
  }
}
