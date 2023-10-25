const express = require('express')
const morgan = require('morgan')
const path = require('path')
const connectDB = require('./server/database/connection')
const cors = require('cors')
let corsOptions = {
    origin: 'https://d3v5t4ck.herokuapp.com/'
};
const { use } = require('./server/routes/router')
const dotenv = require('dotenv')
const app = express()
app.disable("x-powered-by");

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080

app.use(morgan("tiny"))
connectDB()
app.use(express.json())
app.use(cors(corsOptions));
app.set("view engine", "ejs")
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)})