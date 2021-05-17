const shortid = require('shortid');
const db = require('../db');

const sessionCookie = (req, res, next) => {
    if (!req.signedCookies.sessionId) {
        const sessionId = shortid.generate()
        db.get('sessions').push({ id: sessionId }).write()
        res.cookie('sessionId', sessionId, {
            signed: true
        })
    }
    next()
}

module.exports = {
    sessionCookie
}