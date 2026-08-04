const Booking = require("../models/Booking")
const Movie = require("../models/Movie")
const { ADMIN_EMAIL } = require("../middleware/index")

const getAllBookings = async (req, res) => {
  try {
    if (req.session.user.email !== ADMIN_EMAIL) {
      const bookings = await Booking.find({ user: req.session.user._id }).sort({
        createdAt: -1,
      })
      return res.json({ bookings })
    }
    const bookings = await Booking.find({}).populate("user").sort({ createdAt: -1 })
    res.json({ bookings })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error getting bookings!", error: error.message })
  }
}

const addBooking = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." })
    }

    const userTicketRequest = parseInt(req.body.userTicket)
    if (!Number.isInteger(userTicketRequest) || userTicketRequest < 1) {
      return res.status(400).json({ message: "Invalid ticket amount." })
    }
    if (userTicketRequest > movie.Tickets) {
      return res.status(400).json({ message: "Not enough tickets available." })
    }

    const booking = await Booking.create({
      movieId: movie._id,
      name: movie.name,
      language: movie.language,
      picture: movie.picture,
      userTicket: userTicketRequest,
      user: req.session.user._id,
    })

    await Movie.findByIdAndUpdate(movie._id, {
      $inc: { Tickets: -userTicketRequest },
    })

    res.status(201).json({ booking })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error creating booking!", error: error.message })
  }
}

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." })
    }
    if (
      String(booking.user) !== String(req.session.user._id) &&
      req.session.user.email !== ADMIN_EMAIL
    ) {
      return res.status(403).json({ message: "You can't cancel this booking." })
    }

    if (booking.isDone) {
      await Movie.findByIdAndUpdate(booking.movieId, {
        $pullAll: { seats: booking.selectedSeats },
        $inc: { Tickets: booking.userTicket },
      })
    } else {
      await Movie.findByIdAndUpdate(booking.movieId, {
        $inc: { Tickets: booking.userTicket },
      })
    }

    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: "Booking cancelled." })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error cancelling booking!", error: error.message })
  }
}

module.exports = {
  getAllBookings,
  addBooking,
  deleteBooking,
}
