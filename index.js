const express = require('express')

const helpers = require('./helpers')

const app = express()

helpers.applyMiddlewares(app)


const port = process.env.PORT || 5000

app.listen(port)

