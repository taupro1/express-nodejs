const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String
})

const Product = mongoose.model('User', productSchema, 'products')

module.exports = Product