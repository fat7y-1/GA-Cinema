const Booking = require("../models/Booking")
const Movie = require("../models/Movie")

const showSeatPage = async (req, res) => {
  try {
    const bookedSeat = await Booking.findById(req.params.id).populate("movieId")

    res.render("../views/user/seats.ejs", { bookedSeat })
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error find the seat page !", error: error.message })
  }
}

const addSeat = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    await Movie.findByIdAndUpdate(req.params.movieId, {
      $push: { seats: { $each: req.body.seats } },
    })

    booking.isDone = true
    booking.selectedSeats = req.body.seats
    await booking.save()

    res.status(200).json({ message: "Seats updated!" })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error  !", error: error.message })
  }
}

const removeSeat = async (req, res) => {
  try {
    const bookCancel = await Booking.findById(req.params.id)

    await Movie.findByIdAndUpdate(bookCancel.movieId, {
      $pullAll: { seats: bookCancel.selectedSeats },
      $inc: { Tickets: bookCancel.userTicket },
    })

    await Booking.findByIdAndDelete(req.params.id)

    res.redirect("/user/userPage")
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error  !", error: error.message })
  }
}

const showSeatUser = async (req, res) => {
  try {
    const bookedSeat = await Booking.findById(req.params.id).populate("movieId")

    res.render("../views/user/saveSeats.ejs", { bookedSeat })
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error find the seat page !", error: error.message })
  }
}

module.exports = {
  showSeatPage,

  addSeat,
  removeSeat,
  showSeatUser,
}
