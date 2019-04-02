const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const configuredKnex = require('./data/knexConfigged')

const sessionConfig = {
    name: 'pickle rick',
    secret: 'I\'m a pickle',
    cookie: {
        maxAge: 10 * 60 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: configuredKnex,
        tableName: 'sessions',
        sidFieldName: 'sid',
        createTable: true,
        clearInterval: 10 * 6 * 1000
    })
}

const applyMiddlewares = app => {
    app.use(
        helmet(), 
        express.json(),
        session(sessionConfig)
        )
}

module.exports = {
    applyMiddlewares
}