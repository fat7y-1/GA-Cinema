const express = require("express")
const router = express.Router()

const adminController = require("../controllers/adminController")
const tmdbController = require("../controllers/tmdbController")
const { isSignedIn, isAdmin } = require("../middleware/index")

router.use(isSignedIn, isAdmin)

router.get("/tmdb/search", tmdbController.search)
router.get("/tmdb/:id", tmdbController.getMovie)

router.post("/movies", adminController.addMovie)
router.put("/movies/:id", adminController.updateMovie)
router.delete("/movies/:id", adminController.deleteMovie)

module.exports = router
