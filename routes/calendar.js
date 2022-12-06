const router = require('express').Router()

//import calendar controllers
const { saveDate } = require('../controllers/calendar/saveDate')

const baseRoute = '/api/calendar'
router.post(baseRoute + '/booking', saveDate)

module.exports = router
