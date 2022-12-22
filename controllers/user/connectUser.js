const bcrypt = require('bcrypt')
const User = require('../../models/user')
const { createToken } = require('../../middleware/authentication/jsonwebtoken')

const messageError = 'Invalid authentication : wrong email  or password'
const messageSuccess = 'User successfully connect'
const serverError = "Can't connect this user, please try again later"

module.exports.connectUser = async (req, res) => {
  const { email, password } = req.body
  try {
    await User.findOne({ email }).then((user) => {
      if (!user) {
        console.log(messageError)
        return res.status(401).json(messageError)
      }

      bcrypt.compare(password, user.password).then((isValid) => {
        if (!isValid) {
          console.log(messageError)
          return res.status(401).json(messageError)
        }
        const cookieMaxAge = 3 * 24 * 60 * 60 * 1000 // 3 days
        const token = createToken(user._id)

        // send token in cookies
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: cookieMaxAge,
          secure: true,
          sameSite: 'none',
        })

        const connectedUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          postalAddress: user.postalAddress,
          createdAt: user.createdAt,
        }
        console.log(messageSuccess, connectedUser)
        return res.status(200).json(messageSuccess)
      })
    })
  } catch (error) {
    console.log(serverError)
    return res.status(500).json(serverError)
  }
}
