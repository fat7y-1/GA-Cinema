const express = require("express")
const router = express.Router()

const movieController = require("../controllers/movieController")

router.get("/", movieController.allMovies)
router.get("/:id", movieController.getMovie)

module.exports = router
