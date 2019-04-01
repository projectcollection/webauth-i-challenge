const db = require('./knexConfigged')

const users = 'users'

const addUser = (user) => {
    return db(users).insert(user)
}

const getUsers = () => {
    return db(users)
}

module.exports = {
    addUser,
    getUsers
}