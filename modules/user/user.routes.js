const {Router} = require("express")
const router = Router()
const { registerUser, updateUser, getStaffs, getAdmins, deleteUser, loginUser, getUsers } = require("./user.controller");

router.post("/register",registerUser)
router.post("/login",loginUser)
router.patch("/:uuid",updateUser)
router.get("/staffs",getStaffs)
router.get("/",getUsers)
router.get("/admins",getAdmins)
router.delete("/:uuid",deleteUser)

module.exports = router