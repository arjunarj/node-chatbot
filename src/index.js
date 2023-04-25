const express = require("express")
const { ask } = require("./bot")
require('dotenv').config()
const app = express()
const port = process.env.PORT
const host = "0.0.0.0"

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("👍")
})

app.post("/ask",(req,res)=>{
    data = req.body
    res.send(ask(data.summary)); 
})

app.listen(port, host)