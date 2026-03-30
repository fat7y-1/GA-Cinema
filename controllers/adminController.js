const Movie = require("../models/Movie")

const allMovies = async (req, res) => {
  try {
    const movies = await Movie.find({})

    res.render("../views/admin/movies.ejs", { movies })
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error getting all movies !", error: error.message })
  }
}

const showNewMoviePage = async (req, res) => {
  try {
    res.render("../views/admin/addMovie.ejs")
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error getting page new movie !",
      error: error.message,
    })
  }
}

const addMovie = async (req, res) => {
  try {
    await Movie.create({
      ...req.body,
      admin: req.session.user._id,
    })
    res.redirect("/admin/movies")
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error adding new movie !",
      error: error.message,
    })
  }
}

const showUpdateMovie = async (req, res) => {
  try {
    const movieGet = await Movie.findById(req.params.id)
    res.render("../views/admin/updateMovie.ejs", { movieGet })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error show update page movie !",
      error: error.message,
    })
  }
}

const updateMovie = async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.redirect("/admin/movies")
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
    res.redirect("/admin/movies")
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error delete movie !",
      error: error.message,
    })
  }
}

module.exports = {
  allMovies,
  showNewMoviePage,
  addMovie,
  deleteMovie,
  showUpdateMovie,
  updateMovie,
}
