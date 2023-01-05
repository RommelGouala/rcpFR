const express = require('express')
const cors = require('cors')
const uuid = require('uuid');

require('dotenv').config()


//Import routes here
const mainRoutes = require('./routes/index')

//App

const app = express()

//middleware

app.use(express.json())
app.use(cors())

//init Routes

app.use('/receipts', mainRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Live and Localwide at port: ${PORT}`))