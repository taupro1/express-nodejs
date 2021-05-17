const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    name: String,
    phone: String,
    avatar: String,
    password: String,
    email: String
})

const User = mongoose.model('User', useSchema, 'users')

module.exports = User