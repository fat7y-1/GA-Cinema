const Movie = require("../models/Movie")

const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      admin: req.session.user._id,
    })
    res.status(201).json({ movie })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error adding new movie !",
      error: error.message,
    })
  }
}

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." })
    }
    res.json({ movie })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error update  movie !",
      error: error.message,
    })
  }
}

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.json({ message: "Movie deleted." })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error delete movie !",
      error: error.message,
    })
  }
}

module.exports = {
  addMovie,
  deleteMovie,
  updateMovie,
}
