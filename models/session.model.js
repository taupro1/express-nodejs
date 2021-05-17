const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    cart: Object
})

const Session = mongoose.model('User', sessionSchema, 'sessions')

module.exports = Session