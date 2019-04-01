const bcrypt = require('bcryptjs')
const db = require('./knexConfigged')

const users = 'users'

const addUser = (user) => {
    return db(users).insert({...user, password: bcrypt.hashSync(user.password, 4)})
    // dunno why getUser() doesn't work here
}

const authenticate = (userCreds) => {
    return db(users).where({username: userCreds.username}).first().then(user => {
        return bcrypt.compareSync(userCreds.password, user.password)
    })
}

const getUser = (id) => {
    return db(users).where({id}).first()
}
const getUsers = () => {
    return db(users)
}

module.exports = {
    addUser,
    authenticate,
    getUser,
    getUsers
}