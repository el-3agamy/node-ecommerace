const jwt = require("jsonwebtoken") ;
const bcrypt = require("bcryptjs") ;
const {config} = require("dotenv") ;
const { userModel } = require("../Models/User");


config()

// add new client ==> Register :
const addNewClient = async (req , res)=>{
    let {password} = req.body ;
    const hasedPassword = await bcrypt.hash(password , 10) ;
    const newUser = req.body ;
    const user = await userModel.create({...newUser , password:hasedPassword}) ;
    res.status(201).json({data : {id : user._id , name : user.name , email : user.email} , msg:"User added Successfly!"})
} ;

// login :

const login = async function (req , res){
    const {email , password } = req.body ;
    const loginedUser = await userModel.findOne({email}) ;
    if(!loginedUser){ return res.status(401).json({msg : "Unauthorized email"})}
    const checkPassword = await bcrypt.compare(password ,loginedUser.password )
    if(!checkPassword){return res.status(401).json({msg : "un authorized"})} ;
    const token = jwt.sign({id : loginedUser._id , role:loginedUser.role , name : loginedUser.name , email : loginedUser.email} , process.env.SECRET ,{expiresIn : "5d" })
    res.status(200).json({data : {token  , msg : "success"}}) ;
}

// get all users :


const getAllUsers = async function(req , res){
    const allUsers = await userModel.find() ;
    res.status(200).json({data : allUsers , msg:"Success."});
}

// get user By ID :

const getUserById = async function(req , res){
    const {id} = req.params ;
    const user = await userModel.findById(id) ;
    res.status(200).json({data : user , msg:"Success."})
}

// update user data : 

const updateUserData = async function (req , res){
    const {id} =  req.params ;
    const updatedUserData = await userModel.findByIdAndUpdate(id , req.body) ;
    res.status(201).json({data : updatedUserData , msg : "Updated successed."})
}

// delete user by admin : 

const deleteUser = async function (req , res ) {
    const {id} = req.params ;
    const deletedUser = await userModel.findByIdAndDelete(id) ;
    res.status(200).json({msg : "Deleted Done ."})
}

module.exports = {addNewClient , login , getAllUsers , getUserById , updateUserData , deleteUser}


