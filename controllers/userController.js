const User = require("../models/User")
const Booking = require("../models/Booking")
const Movie = require("../models/Movie")

const getAllBooking = async (req, res) => {
  try {
    if (req.session.user.email !== "admin@email.com") {
      const book = await Booking.find({ user: req.session.user._id })

      res.render("../views/user/userPage.ejs", { book })
    } else {
      const book = await Booking.find({}).populate("user")
      res.render("../views/user/userPage.ejs", { book })
    }
  } catch (error) {
    console.error("⚠️ An error has occurred getting all book!", error.message)
  }
}

const showAddBookingPage = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    res.render("../views/user/newBooking.ejs", { movie })
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error getting page!", error: error.message })
  }
}

const addBook = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    const userTicketRequest = parseInt(req.body.userTicket)

    if (!movie) {
      return res.send("❌ No movie found")
    }

    await Booking.create({
      movieId: movie._id,
      name: movie.name,
      language: movie.language,
      picture: movie.picture,
      userTicket: userTicketRequest,
      user: req.session.user._id,
    })

    await Movie.findByIdAndUpdate(req.params.id, {
      $inc: { Tickets: -userTicketRequest },
    })
    res.redirect("/user/userPage")
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error !", error: error.message })
  }
}

const DeleteBook = async (req, res) => {
  try {
    const TicketsBack = await Booking.findById(req.params.id)
    await Movie.findByIdAndUpdate(TicketsBack.movieId, {
      $inc: { Tickets: TicketsBack.userTicket },
    })
    await Booking.findByIdAndDelete(req.params.id)

    res.redirect("/user/userPage")
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error for delete !", error: error.message })
  }
}

const showMovieDesc = async (req, res) => {
  try {
    const descMovie = await Movie.findById(req.params.id)

    res.render("../views/movieDescription.ejs", { descMovie })
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error getting page!", error: error.message })
  }
}

module.exports = {
  getAllBooking,
  showAddBookingPage,
  addBook,
  DeleteBook,
  showMovieDesc,
}
