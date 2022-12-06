const router = require('express').Router()

//import calendar controllers
const { createUser } = require('../controllers/user/createUser')
const { connectUser } = require('../controllers/user/connectUser')
const { disconnectUser } = require('../controllers/user/disconnectUser')
const { findUserById } = require('../controllers/user/findUserById')
const { editUserAddress } = require('../controllers/user/editUser')

const baseRoute = '/api/users'
router.post(baseRoute + '/signup', createUser)
router.post(baseRoute + '/login', connectUser)
router.get(baseRoute + '/logout', disconnectUser)
router.get(baseRoute + '/:id', findUserById)
router.put(baseRoute + '/update/:id', editUserAddress)

module.exports = router
