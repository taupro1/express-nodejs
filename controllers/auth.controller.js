const db = require('../db')
const bcrypt = require('bcrypt')

const loginAuth = (req, res) => {
    res.render('auth/login')
}

const postLoginAuth = async (req, res) => {
    const { email, password } = req.body
    const error = {}
    let user = null

    if (!email) {
        error.isErrorEmail = 'Email is required'
    } else {
        user = db.get('users').find({ email: email }).value()
        if (!user) {
            error.isErrorEmail = 'Email isvalid'
        }
    }

    // const hash = await bcrypt.hash('1234', 10)

    if (!password) {
        error.isErrorPassword = 'Password is required'
    } else {
        user = db.get('users').find({ email: email }).value()
        if (user) {
            const result = await bcrypt.compare(password, user.password)
            if (!result) {
                error.isErrorPassword = 'Password isvalid'
            }
        }
    }

    if (Object.values(error).length) {
        res.render('auth/login', {
            error,
            value: req.body
        })
        return
    }
    res.cookie('userId', user.id, {
        signed: true
    })
    res.redirect('/user')
}

module.exports = {
    loginAuth,
    postLoginAuth
}