const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')

router.get('/add/:productId', cartController.addCart)

module.exports = router