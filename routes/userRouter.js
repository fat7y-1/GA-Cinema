const express = require("express")
const router = express.Router()

const middleware = require("../middleware/index")
const bookingController = require("../controllers/bookingController")

router.use(middleware.isSignedIn)

router.get("/", bookingController.getAllBookings)
router.post("/:movieId", bookingController.addBooking)
router.delete("/:id", bookingController.deleteBooking)

module.exports = router
