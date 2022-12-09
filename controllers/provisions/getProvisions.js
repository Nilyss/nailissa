const Provision = require('../../models/provision')

// response and logs messages
const messageError = `Can't get provisions`
const messageSuccess = `Successfully get all provisions`
const serverError = `Can't get provisions, please try again later`

module.exports.getProvisions = async (req, res) => {
  try {
    console.log('req body ?', req.body)
    console.log('req params ?', req.params)
    await Provision.find().then((provisions) => {
      console.log('provisions =>', provisions)
      if (!provisions) {
        console.log(messageError, provisions)
        return res.status(400).json(messageError)
      }
      console.log(messageSuccess, provisions)
      return res.status(200).json(provisions)
    })
  } catch (error) {
    console.log(serverError)
    return res.status(500).json(serverError)
  }
}
