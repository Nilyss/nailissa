const router = require('express').Router()

//import calendar controllers
const { saveDate } = require('../controllers/calendar/saveDate')
const { isValidUser } = require('../middleware/authentication/jsonwebtoken')

const baseRoute = '/api/calendar'
router.post(baseRoute + '/booking', isValidUser, saveDate)

module.exports = router
