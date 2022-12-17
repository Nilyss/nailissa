const router = require('express').Router()
const { isValidUser } = require('../middleware/authentication/jsonwebtoken')

//import calendar controllers
const { createUser } = require('../controllers/user/createUser')
const { connectUser } = require('../controllers/user/connectUser')
const { disconnectUser } = require('../controllers/user/disconnectUser')
const { findUserById } = require('../controllers/user/findUserById')
const { editUserAddress } = require('../controllers/user/editUser')
const { editUserBookedDate } = require('../controllers/user/editUser')
const { findUserProvisions } = require('../controllers/user/getUserProvision')

const baseRoute = '/api/users'
router.post(baseRoute + '/signup', createUser)
router.post(baseRoute + '/login', connectUser)
router.get(baseRoute + '/logout', isValidUser, disconnectUser)
router.get(baseRoute + '/:id', isValidUser, findUserById)
router.put(baseRoute + '/update/:id', isValidUser, editUserAddress)
router.put(baseRoute + '/booking/:id', isValidUser, editUserBookedDate)
router.get(baseRoute + '/:id/booked', isValidUser, findUserProvisions)

module.exports = router
