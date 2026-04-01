const express = require("express")
const router = express.Router()
const seatController = require("../controllers/seatController")

router.get("/seatPage/:id", seatController.showSeatPage)
router.post("/bookedSeat/:movieId/:id", seatController.addSeat)
router.delete("/seatCancel/:id", seatController.removeSeat)
router.get("/viewSeat/:id", seatController.showSeatUser)
module.exports = router
