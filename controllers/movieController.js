const Movie = require("../models/Movie")

const allMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ createdAt: -1 })
    res.json({ movies })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error getting movies!", error: error.message })
  }
}

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." })
    }
    res.json({ movie })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error getting movie!", error: error.message })
  }
}

module.exports = {
  allMovies,
  getMovie,
}
