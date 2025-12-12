const express = require("express") ;
const mongoose = require("mongoose") ;
const cors = require("cors") ;
const userRouter = require("./Routes/User")
const productsRouter = require("./Routes/Products")
const cartRouter = require("./Routes/Cart")
const orderRouter = require("./Routes/Orders")
const app = express() ;



// cors midleware : 
app.use(cors()) ;
// parssing requests midleware :
app.use(express.json()) ;
// app.use(express.urlencoded({extended : true}))
// routing middleware :
app.use("/users" , userRouter)
app.use('/products' , productsRouter)
app.use("/cart" , cartRouter)
app.use("/orders" , orderRouter)
// 
app.use("/Uploads" , express.static("Uploads")) ;
// middleware to handling all errors in all routes without craching server>
app.use((err, req, res, next) => {
  console.log("Saeid")
    return res
      .status(500)
      .json({ status: 500, errMsg: err.message, stack: err.stack });
  });

async function main(){
  await  mongoose.connect('mongodb://127.0.0.1:27017/eccomerce_ITI')
}
main().catch(err=>console.log(err)) ;
// run on port 
const port = 3000 ;
app.listen(port , ()=>{console.log(`app run on port ${port}`);}) ;