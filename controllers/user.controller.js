const shortid = require('shortid');
const db = require('../db')

const getUsers = (req, res) => {
    res.render('users/user', {
        users: db.get('users').value()
    })
}

const searchUser = (req, res) => {
    const name = req.query.name
    const queryName = db.get('users').value().filter(i => i.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
    res.render('users/user', {
        users: queryName
    })
}

const getViewUser = (req, res) => {
    const id = req.params.id
    const user = db.get('users').find({ id }).value()
    res.render('users/view', {
        user
    })
}

const getCreateUser = (req, res) => {
    res.render('users/create')
}

const postCreatUser = (req, res) => {
    req.body.id = shortid.generate()
    req.body.avatar = req.file.path.replace(/\\/, '/').split('/').slice(1).join('/')
    db.get('users').push(req.body).write()
    res.redirect('/user')
}

const removeUser = (req, res) => {
    const id = req.params.id
    db.get('users').remove({ id }).write()
    res.redirect('/user')
}

module.exports = {
    getUsers,
    searchUser,
    getViewUser,
    getCreateUser,
    postCreatUser,
    removeUser
}