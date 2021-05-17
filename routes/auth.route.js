const express = require('express')
const router = express.Router()
const loginController = require('../controllers/auth.controller')

router.get('/login', loginController.loginAuth)

router.post('/login', loginController.postLoginAuth)

module.exports = router