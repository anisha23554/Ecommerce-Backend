/* REQUIRMENTS:
npm i express cors dotenv mongoose
npm i --save-dev nodemon @babel/cli @babel/core @babel/node @babel/preset-env @babel/plugin-transform-runtime
scripts:
"dev":"nodemon -w src --exec \"babel-node src\""
*/
// using ES6 format

import dotenv from 'dotenv'
// dotenv.config() - adds environment variable from .env file
dotenv.config()
import express from 'express'
import connectdb from './services/mongodb/connectdb'
import authRoutes from './routes/authRoutes'
import categoryRoutes from "./routes/categoryRoutes"
import productRoutes from "./routes/productRoutes"
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 6000
console.log('hello')

connectdb()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.get('/',(req,res)=>{
  res.send(`Server running at ${PORT}`)
})
app.listen(PORT,(req,res)=>{
    console.log("server listening at PORT",PORT)
  }
)