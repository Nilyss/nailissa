const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.USER_DB_NAME}:${process.env.USER_DB_PASSWORD}@${process.env.CLUSTER_NAME}/?retryWrites=true&w=majority`,
    (err) => {
      if (!err) {
        console.log('Successfully connected to DB')
      }
      if (err) {
        console.log(err, ': Connexion to DB failed')
      }
    }
  )
}
