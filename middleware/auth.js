const {User} = require('../models/mongo/userModel')
const auth = (req, res, next) => {
    let token = req.session.authToken

    User.findByToken(token, (err, user)=> {
        if(err) throw err
        if(!user) return res.json({ isAuth: false, error: true})
        req.token = token
        req.user. user
        next()
    })
}

module.exports = { auth }