const express = require("express")
const router = express.Router()
const seatController = require("../controllers/seatController")
const { isSignedIn } = require("../middleware/index")

router.use(isSignedIn)

router.get("/:id", seatController.getSeatSelection)
router.post("/:id", seatController.saveSeats)
router.get("/:id/view", seatController.getSeatView)

module.exports = router
