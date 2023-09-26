const express = require("express")
const router = express.Router()
const {getAllUsers,
getSingleUser,
showCurrentUser,
updateUser,
updateUserPassword,
deleteUserAccount}= require("../controller/userController")

const {getPostbyUser} = require("../controller/mainController")

const{auth, authorizePermissions}= require("../middleware/auth")

router.route("/").get(auth, authorizePermissions("admin"),  getAllUsers)
router.route("/showMe").get(auth, showCurrentUser)
router.route("/updateUser").patch(auth, updateUser)
// router.post("/verifyEmail", verifyEmail);
router.route("/updateUserPassword").patch(auth, updateUserPassword)
router.route("/:id").get(auth,  getSingleUser)
router.route("/:id").delete(auth, deleteUserAccount)

router.route("/:id/posts").get(auth, authorizePermissions("admin"),  getPostbyUser)
module.exports = router