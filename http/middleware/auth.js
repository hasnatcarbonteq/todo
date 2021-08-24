

function checkAuthentication (req, res, next){
    if(req.session.token){
        next()
    } else res.redirect('/user/login')
}

module.exports = {
    checkAuthentication,
}