const express = require("express")
const app = express()
require('dotenv').config()
require('./conn/conn')
const apiUser = require('./Routes/user')
const apiTask = require('./Routes/task')
const cors = require('cors')

app.use(express.json())
app.use(cors({origin : 'http://localhost:3000'}))

app.use('/api/v1', apiUser)
app.use('/api/v2', apiTask)

app.listen(2000, ()=>{
    console.log("http://localhost:2000/")
})