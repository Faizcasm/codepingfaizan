import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import {createServer} from 'http'
const app =express()
const server = createServer(app)
const port =500;
dotenv.config({
    path:'./.env'
})
const database = async()=>{
    try {
        const connect = await mongoose.connect(`${process.env.url}/mooodmedia`)
        console.log("connected ",connect.connection.host);
    } catch (error) {
        console.log(error);
    }
}
database()
.then(listen=>{
    server.listen(port,()=>{
        console.log(port);
    })
})
.catch(err=>{
    console.log(err);
})
app.get('/',(req,res)=>{
res.send("Backend is up")
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type , Accept');
      res.header('Content-type','text/plain, application/octet-stream , application/json ,image/apng,image/avif')
    next();
  });
  const options={
      origin:'http://localhost:5173',
      credentials:true,
       methods: ["GET", "POST","PUT","DELETE"],
  }
app.use(cors(options))
import router from './router.js'
app.use('/',router)