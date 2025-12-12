
const mongoose = require("mongoose") ;
const userSchema = new mongoose.Schema({
    name :{
        type : String ,
        required : true ,
        min : 3 ,
        max : 15 ,
    } ,
    email :{
        type : String ,
        required : true ,
        trim : true ,
        lowercase : true ,
    //     match : [   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    //   "Please provide a valid email address"],
        validate :{
            validator : (userEmail)=>{
                 return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);

            } , 
            message :({value})=>`${value} is not valid email , try again`
        }
    } ,
    phone :{
        type : Number ,
        required : [true , "Phone Is required."] ,
        unique : true ,
        trim : true ,
        validate :{
            validator : (userPhone)=>{
                return /^(?:\+20|0)?1[0125]\d{8}$/.test(userPhone) ;

            } ,
            message : ({value})=>`${value} is not invaild Egyption Number.`
        } 
    } ,

    password : {
        type : String ,
        required : [true , "Password is required."] ,
        trim : true ,
        validate:{
            validator : (userPassword)=>{
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword) ;

            } ,
            message :({value})=>"Password must be at least 8 characters long and contain at least one letter and one number"
        }

    } ,
    gender:{
        type : String ,
        required : true ,
        enum:["male" , "female"] ,
        lowercase : true,
        trim:true,
    }  ,
    role :{
        type : String ,
        required : true ,
        trim : true ,
        lowercase : true , 
        enum : ["client" , "seller" , "admin"] 
    }
   
} , 
{
        timestamps : {
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        } ,
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true },

    }
   
  
    

)


const userModel = mongoose.model("User" , userSchema , "User")  ;

module.exports = {userModel}