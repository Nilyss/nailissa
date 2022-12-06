const User = require('../../models/user')

const messageSuccess = 'User successfully created'
const serverError = "Can't create this user, please try again later"

module.exports.createUser = async (req, res) => {
  console.log('req.body =>', req.body)
  console.log('req.body.postalAddress =>', req.body.postalAddress)
  const { email, password, firstName, lastName, phoneNumber, postalAddress } =
    req.body
  const user = await new User({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    postalAddress,
  })
  try {
    user
      .save()
      .then(() => {
        console.log(messageSuccess, user)
        return res.status(201).json(messageSuccess)
      })
      .catch((error) => {
        const messageError = `Failure while creating user, error :${error}`
        console.log(messageError)
        return res.status(400).json({ messageError })
      })
  } catch (error) {
    console.log(serverError)
    return res.status(500).json({ serverError })
  }
}
