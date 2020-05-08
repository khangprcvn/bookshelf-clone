const express = require('express')

const usersController = require('./usersController')

const router = express.Router()

router.get('/me', usersController.getUser)
router.post('/signup', usersController.signup)
router.post('/login', usersController.login)

module.exports = router
