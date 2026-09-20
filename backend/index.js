const express= require("express")
const bodyParser = require('body-parser');
const app= express()
const cors = require('cors')
require("dotenv").config()
app.use(bodyParser.json())
app.use(cors())

const AuthRouter = require("./Routes/AuthRouter")
const productRouter = require("./Routes/ProductRouter")


require("./Models/db")
const PORT = process.env.PORT || 8080
app.get('/ping' , (req , res)=>{

   res.send('pong')

})


app.use('/auth',AuthRouter)
app.use('/products',productRouter)
app.listen(PORT,()=>{
    console.log('server is running on ',PORT )
}) 