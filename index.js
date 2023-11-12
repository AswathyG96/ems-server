require('dotenv').config()

const express = require('express') 

const cors = require('cors')
const router = require('./routes/router')
require('./db/connection')
const server = express()

const PORT = process.env.PORT|| 4000
 server.use(cors())
 //middleware
server.use(express.json())
server.use(router)
server.get('/',(req,res)=>{
    res.send(`EMS Server Started!!!`)
})

server.listen(PORT,()=>{
    console.log(`EMS Server Started at the port number ${PORT}`);
})