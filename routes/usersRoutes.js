const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('../data/usersAccessHelpers')

router.get('/', (req, res) => {
    res.send('wtf is goin on')
})
router.post('/register', async (req, res) => {
    const {firstName, lastName, username, password} = req.body

    if(!firstName || !lastName || !username || !password){
        res.status(401).json('incomplete data')
        return
    }else{
        try{
            const userids = await db.addUser(req.body)
            const user = await db.getUser(userids[0])
            res.status(201).json(user)
        }catch(e){
            res.status(500).json('server error')
        }
    }
})

router.get('/users', async (req, res) => {
    const {username, password} = req.headers
    if(!username || !password){
        res.status(401).json('incomplete credentials')
        return
    }else{
        try {
            const isValidCreds = await db.authenticate({username, password})
            if(isValidCreds){
                const users = await db.getUsers()
                res.status(200).json(users)
            }else{
                res.status(401).json('invalid username or password')
            }
        } catch (error) {
            res.status(500).json({message: 'server error', error: error.message} )
        }
    }
})

module.exports = router