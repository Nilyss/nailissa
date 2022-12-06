const Calendar = require('../../models/calendar')

const messageSuccess = 'Date successfully saved'
const serverError = "Can't save this date, please try again later"

module.exports.saveDate = async (req, res) => {
  console.log('req body =>', req.body)
  const { date, time } = req.body

  const calendar = await new Calendar({ date, time })
  try {
    calendar
      .save()
      .then(() => {
        console.log({ messageSuccess, data: calendar })
        res.status(201).json({ messageSuccess, data: calendar })
      })
      .catch((error) => {
        const messageError = `Failure while saving date, error : ${error}`
        console.log(messageError)
        res.status(400).json({ messageError })
      })
  } catch (error) {
    console.log(serverError)
    res.status(500).json({ serverError })
  }
}
