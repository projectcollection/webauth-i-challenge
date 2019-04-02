const bcrypt = require('bcryptjs')
const db = require('./knexConfigged')

const users = 'users'

const addUser = async (user) => {
    const [id] = await db(users).insert({...user, password: bcrypt.hashSync(user.password, 4)})
    return getUserById(id)
}

const authenticate = (userCreds) => {
    return db(users).where({username: userCreds.username}).first().then(user => {
        return bcrypt.compareSync(userCreds.password, user.password)
    })
}

const getUserById = (id) => {
    return db(users).where({id}).first()
}

const getUserBy = (filter) => {
    return db(users).where(filter)
}

const getUsers = () => {
    return db(users)
}

module.exports = {
    addUser,
    authenticate,
    getUserById,
    getUserBy,
    getUsers
}