
const restricted = (req, res, next) => {
    if(req.session && req.session.user){
        next()
    }else{
        res.status(401).json('invalid credentials')
    }
}

module.exports = {
    restricted
}