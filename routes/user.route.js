const express = require('express')
const multer = require('multer')
const router = express.Router()
const upload = multer({ dest: './public/uploads/' })
const userController = require('../controllers/user.controller')
const validateUser = require('../validate/user.validate')

router.get('', userController.getUsers)

router.get('/search', userController.searchUser)

router.get('/infomation/:id', userController.getViewUser)

router.get('/create', userController.getCreateUser)

router.get('/remove/:id', userController.removeUser)

router.post('/create', upload.single('avatar'), validateUser.validateLogin, userController.postCreatUser)

module.exports = router