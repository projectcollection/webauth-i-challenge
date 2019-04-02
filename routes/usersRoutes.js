const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('../data/usersAccessHelpers')
const middlewares = require('../middlewares')


router.post('/register', async (req, res) => {
    const {firstName, lastName, username, password} = req.body

    if(!firstName || !lastName || !username || !password){
        res.status(401).json('incomplete data')
        return
    }else{
        try{
            const user = await db.addUser(req.body)
            res.status(201).json(user)
        }catch(e){
            res.status(500).json({message: 'server error, probably username is already taken'})
        }
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        res.status(400).json('incomplete data')
    }else{
        try {
            const user = await db.getUserBy({username}).first();
            if(user && await db.authenticate({username, password})){
                req.session.user = user;
                res.status(200).json(`hallo ${user.username}`);
            }else{
                res.status(401).json('Invalid Credentials')
            }
        } catch (error) {
            res.status(500).json('server error')
        }
    }
})

router.get('/users', middlewares.restricted, async (req, res) => {
    try {
        const users = await db.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'server error', error: error.message});
    }
})

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(500).json('server error');
            }else{
                res.status(200).json('bye');
            }
        })
    }else{
        res.status(200).json('what u doin?')
    }
})

module.exports = router