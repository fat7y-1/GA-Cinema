const express = require("express")
const router = express.Router()

const middleware = require("../middleware/index")
const userController = require("../controllers/userController")

const { model } = require("mongoose")

router.get("/newBooking/:id", userController.showAddBookingPage)
router.get("/userPage", userController.getAllBooking)
router.post("/newBook/:id", middleware.isSignedIn, userController.addBook)
router.delete("/:id", userController.DeleteBook)
router.get("/movieDescription/:id", userController.showMovieDesc)

module.exports = router
