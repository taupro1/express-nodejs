const validateLogin = (req, res, next) => {
    const { name = '', phone = '' } = req.body

    const error = {}
    if (!name) {
        error.isNameRequired = 'Name is required'
    }
    if (!phone) {
        error.isPhoneRequired = 'Phone is required'
    }
    if (Object.values(error).length) {
        res.render('users/create', {
            error,
            value: req.body
        })
        return
    }
    next()
}

module.exports = {
    validateLogin
}