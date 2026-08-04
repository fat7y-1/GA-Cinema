const express = require("express")
const router = express.Router()

const authController = require("../controllers/authController")
const { isSignedIn } = require("../middleware/index")

router.get("/me", authController.me)
router.post("/sign-up", authController.registerUser)
router.post("/sign-in", authController.signInUser)
router.post("/sign-out", authController.signOut)
router.put("/password", isSignedIn, authController.updatePassword)

module.exports = router
