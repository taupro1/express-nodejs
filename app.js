require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const csrf = require('csurf')
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/cart.route')
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT || 3000;

// Middleware
const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

app.set('view engine', 'pug')
app.set('views', './views');
mongoose.connect(process.env.MONGOOSE_URL);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware.sessionCookie)
app.use(csrf({ cookie: true }))

app.get('/', (req, res) => {
    res.render('index')
})

// Route
app.use('/user', authMiddleware.authLogin, userRouter)
app.use('/auth', authRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

app.listen(port)