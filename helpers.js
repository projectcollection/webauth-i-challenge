const express = require('express')
const helmet = require('helmet')

const applyMiddlewares = app => {
    app.use(helmet(), express.json())
}

module.exports = {
    applyMiddlewares
}