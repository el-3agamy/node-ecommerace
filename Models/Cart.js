const mongoose = require("mongoose") ;
const cartSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId ,
        ref :"User" ,
        required : true ,
    } ,
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId ,
                ref : "Products" ,
                required : true ,
            } ,

            quantity :{
                type : Number ,
                required : true ,
                min : 1 ,
                default : 1 ,
            }
        }
    ] ,
} , {
    timestamps :{
        createdAt : "created_at" ,
        updatedAt : "updated_at",
    }
})

const cartModel = mongoose.model("Cart" , cartSchema , "Cart") ;
module.exports = {cartModel} ;