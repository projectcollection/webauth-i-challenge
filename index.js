const express = require('express')

const helpers = require('./helpers')
const usersRoutes = require('./routes/usersRoutes')

const app = express()

helpers.applyMiddlewares(app)

app.use('/api', usersRoutes)

const port = process.env.PORT || 5000

app.listen(port)

