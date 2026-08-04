const Booking = require("../models/Booking")
const Movie = require("../models/Movie")
const { ADMIN_EMAIL } = require("../middleware/index")

const canAccess = (booking, req) =>
  String(booking.user) === String(req.session.user._id) ||
  req.session.user.email === ADMIN_EMAIL

const getSeatSelection = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("movieId")
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." })
    }
    if (!canAccess(booking, req)) {
      return res.status(403).json({ message: "Not your booking." })
    }
    res.json({ booking })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error loading seat selection!", error: error.message })
  }
}

const saveSeats = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." })
    }
    if (!canAccess(booking, req)) {
      return res.status(403).json({ message: "Not your booking." })
    }
    if (booking.isDone) {
      return res.status(400).json({ message: "Seats already selected for this booking." })
    }

    const seats = Array.isArray(req.body.seats) ? req.body.seats.map(Number) : []
    if (seats.length !== booking.userTicket) {
      return res
        .status(400)
        .json({ message: `Please select exactly ${booking.userTicket} seat(s).` })
    }

    const movie = await Movie.findById(booking.movieId)
    const alreadyTaken = seats.some((s) => movie.seats.includes(s))
    if (alreadyTaken) {
      return res.status(409).json({ message: "One or more selected seats were just taken." })
    }

    await Movie.findByIdAndUpdate(booking.movieId, {
      $push: { seats: { $each: seats } },
    })

    booking.isDone = true
    booking.selectedSeats = seats
    await booking.save()

    res.json({ booking })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error saving seats!", error: error.message })
  }
}

const getSeatView = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("movieId")
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." })
    }
    if (!canAccess(booking, req)) {
      return res.status(403).json({ message: "Not your booking." })
    }
    res.json({ booking })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error loading seats!", error: error.message })
  }
}

module.exports = {
  getSeatSelection,
  saveSeats,
  getSeatView,
}
