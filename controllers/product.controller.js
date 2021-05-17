const db = require('../db')

const getProduct = (req, res) => {
    const { sessionId } = req.signedCookies
    const { page = 1 } = req.query
    let countProduct = 0
    const perPage = 8
    const total = Math.floor(db.get('products').value().length / perPage)
    const arrPage = []
    const start = (page - 1) * perPage
    const end = page * perPage
    for (i = page; arrPage.length < 3; i++) {
        arrPage.push(i)
    }
    if (sessionId) {
        const storeCart = db.get('sessions').find({ id: sessionId }).get('cart').value()
        if (storeCart) {
            countProduct = eval(Object.values(storeCart).join('+')) || 0
        }
    }
    res.render('products/product', {
        products: db.get('products').value().slice(start, end),
        arrPage,
        previous: page - 1 ? page - 1 : page,
        next: +page + 1 > total ? page : +page + 1,
        countProduct
    })
}

module.exports = {
    getProduct
}