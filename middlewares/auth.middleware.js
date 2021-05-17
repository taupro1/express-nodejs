const db = require('../db')

const authLogin = (req, res, next) => {
    const { userId = '' } = req.signedCookies

    if (!userId) {
        res.redirect('/auth/login')
        return
    }

    const user = db.get('users').find({ id: userId }).value()

    if (!user) {
        res.redirect('/auth/login')
        return
    }
    res.locals.storm = '123'
    next()
}

module.exports = {
    authLogin
}