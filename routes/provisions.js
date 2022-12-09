const router = require('express').Router()

//import calendar controllers
const { getProvisions } = require('../controllers/provisions/getProvisions')

const baseRoute = '/api/provisions'
router.get(baseRoute, getProvisions)

module.exports = router
