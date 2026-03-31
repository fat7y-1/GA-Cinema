const express = require("express")
const router = express.Router()

const authController = require("../controllers/authController")

router.get("/sign-up", authController.showSignUpPage)
router.post("/sign-up", authController.registerUser)
router.get("/sign-in", authController.showSignInPage)
router.post("/sign-in", authController.signInUser)
router.get("/sign-out", authController.signOut)
router.put("/:id", authController.updatePassword)

// router.get("/sign-up", (req, res) => {
//   res.render("auth/sign-up.ejs")
// })

// router.get("/sign-in", (req, res) => {
//   res.render("auth/sign-in.ejs")
// })

// // router.get("/:id/update-password", (req, res) => {
// //   res.render("auth/update-password.ejs")
// // })

router.get("/:id/update-password", authController.showUpdatePage)
router.get("/:id/admin", authController.showAdminPage)
//router.get("/")
module.exports = router
