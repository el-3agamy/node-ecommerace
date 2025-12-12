// const express = require("express") ;
// const mongoose = require("mongoose") ;
// const cors = require("cors") ;
// const userRouter = require("./Routes/User")
// const productsRouter = require("./Routes/Products")
// const cartRouter = require("./Routes/Cart")
// const orderRouter = require("./Routes/Orders")
// const app = express() ;



// // cors midleware : 
// app.use(cors()) ;
// // parssing requests midleware :
// app.use(express.json()) ;
// // app.use(express.urlencoded({extended : true}))
// // routing middleware :
// app.use("/users" , userRouter)
// app.use('/products' , productsRouter)
// app.use("/cart" , cartRouter)
// app.use("/orders" , orderRouter)
// // 
// app.use("/Uploads" , express.static("Uploads")) ;
// // middleware to handling all errors in all routes without craching server>
// app.use((err, req, res, next) => {
//   console.log("Saeid")
//     return res
//       .status(500)
//       .json({ status: 500, errMsg: err.message, stack: err.stack });
//   });

// async function main(){
//   await  mongoose.connect('mongodb://127.0.0.1:27017/eccomerce_ITI')
// }
// main().catch(err=>console.log(err)) ;
// // run on port 
// const port = 3000 ;
// app.listen(port , ()=>{console.log(`app run on port ${port}`);}) ;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const userRouter = require("./Routes/User");
const productsRouter = require("./Routes/Products");
const cartRouter = require("./Routes/Cart");
const orderRouter = require("./Routes/Orders");

const app = express();

// ===== Middleware =====

// CORS
app.use(cors());

// Parsing JSON requests
app.use(express.json());

// Static folder for uploads
app.use("/Uploads", express.static("Uploads"));

// Routes
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    status: 500,
    errMsg: err.message,
    stack: err.stack,
  });
});

// ===== Database Connection & Server Start =====

// MongoDB URI
// Local: 'mongodb://127.0.0.1:27017/eccomerce_ITI'
// Atlas example: 'mongodb+srv://user:pass@cluster0.mongodb.net/eccomerce_ITI?retryWrites=true&w=majority'
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eccomerce_ITI";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 ثانية للـ timeout
    });
    console.log("✅ MongoDB connected successfully");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // إيقاف السيرفر لو الاتصال فشل
  }
}

startServer();
