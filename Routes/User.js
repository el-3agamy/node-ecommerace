const express = require("express") ;
const router = express.Router() ;
const { addNewClient  , getAllUsers , getUserById , updateUserData, deleteUser, login} = require("../Controllers/User");
const { authMiddleware } = require("../Middleware/authMiddleware");

router.post('/register' , addNewClient) ;
router.post('/login' , login)
router.get("/" ,  authMiddleware , getAllUsers)
router.route("/:id").get(getUserById).patch(updateUserData).delete(deleteUser) ;
// router.get("/:id" , getAllUsers)
// router.patch("/:id" , updateUserData)
// router.delete("/:id" , deleteUser)

module.exports = router ;