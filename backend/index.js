const express= require("express")
const app= express()
const bodyParser = require('body-parser');
const AuthRouter = require("./Routes/AuthRouter")
const productRouter = require("./Routes/ProductRouter")
const cors = require('cors')
require("dotenv").config()

require("./Models/db")
const PORT = process.env.PORT || 8080
app.get('/ping' , (req , res)=>{

   res.send('pong')

})
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/products',productRouter)
app.listen(PORT,()=>{
    console.log('server is running on ',PORT )
}) 