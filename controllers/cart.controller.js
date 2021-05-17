const db = require('../db')

const addCart = (req, res) => {
    const { sessionId } = req.signedCookies
    const { productId = '' } = req.params
    const count = db.get('sessions').find({ id: sessionId }).get('cart.' + productId, 0).value()
    db.get('sessions').find({ id: sessionId }).set('cart.' + productId, count + 1).write()
    res.redirect('/product')
}

module.exports = {
    addCart
}