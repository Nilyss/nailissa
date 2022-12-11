const User = require('../../models/user')

// response and logs messages
const successMessage = `Provision fetched`
const errorMessage = `Can't get provision`
const serverError = `Can't find provision, please try again later`

module.exports.findUserProvisions = async (req, res) => {
  const paramsId = req.params.id

  try {
    await User.findOne({ _id: paramsId })
      .select('-password')
      .then((user) => {
        if (!user) {
          console.log(errorMessage)
          return res.status(400).json(errorMessage)
        }
        console.log(successMessage)
        return res.status(200).json(user.bookedDate)
      })
  } catch (error) {
    console.log(serverError)
    return res.status(500).json(serverError, error)
  }
}
