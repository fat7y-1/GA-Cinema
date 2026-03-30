const express = require("express")
const router = express.Router()

const adminController = require("../controllers/adminController")

const { model } = require("mongoose")

router.get("/movies", adminController.allMovies)
router.get("/new", adminController.showNewMoviePage)
router.post("/movies", adminController.addMovie)
router.get("/movies/:id", adminController.showUpdateMovie)
router.put("/movies/:id", adminController.updateMovie)
router.delete("/:id", adminController.deleteMovie)

module.exports = router
