const Booking = require("../models/Booking")
const Movie = require("../models/Movie")

const showSeatPage = async (req, res) => {
  try {
    const bookedSeat = await Booking.findById(req.params.id).populate("movieId")
    // bookedSeat.isDone = true
    // bookedSeat.save()

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

// const addSeat = async (req, res) => {
//   try {
//     const bookedSeat = await Booking.findById(req.params.id)

//     // 1. Update Movie
//     await Movie.findByIdAndUpdate(req.params.movieId, {
//       $push: { seats: { $each: req.body.seats } },
//     })

//     // 2. Update and SAVE Booking (Now it will work because of the Schema change!)
//     bookedSeat.selectedSeats = req.body.seats
//     bookedSeat.isDone = true
//     await bookedSeat.save()

//     res.status(200).json({ message: "Seats updated!" })
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "⚠️ Error saving seats!", error: error.message })
//   }
// }
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
// const showSeatUser = async (req, res) => {
//   try {
//     // Populate movieId so we can see ALL taken seats vs YOUR seats
//     const bookedSeat = await Booking.findById(req.params.id).populate("movieId")

//     if (!bookedSeat) return res.status(404).send("Booking not found")

//     res.render("../views/user/saveSeats.ejs", { bookedSeat })
//   } catch (error) {
//     res.status(500).json({
//       message: "⚠️ Error finding the seat page!",
//       error: error.message,
//     })
//   }
// }

// const removeSeat = async (req, res) => {
//   try {
//     // 1. FIRST: Find the booking using the ID from the URL (req.params.id)
//     // We need this to know HOW MANY tickets to add back and WHICH seats to remove
//     const bookingToDelete = await Booking.findById(req.params.id)

//     if (!bookingToDelete) {
//       return res.status(404).send("Booking not found")
//     }

//     // 2. SECOND: Update the Movie
//     await Movie.findByIdAndUpdate(bookingToDelete.movieId, {
//       // Use $pullAll to remove the specific array of seats
//       // (Note: $pullAll doesn't use $each, it just takes the array)
//       $pullAll: { seats: bookingToDelete.selectedSeats },

//       // Use $inc to add the tickets back
//       $inc: { Tickets: bookingToDelete.userTicket },
//     })

//     // 3. THIRD: Now that the movie is updated, delete the booking record
//     await Booking.findByIdAndDelete(req.params.id)

//     // 4. FINALLY: Go back to the user page
//     res.redirect("/user/userPage")
//   } catch (error) {
//     console.error("Delete Error:", error)
//     res
//       .status(500)
//       .json({ message: "⚠️ Error returning tickets!", error: error.message })
//   }
// }

module.exports = {
  showSeatPage,

  addSeat,
  removeSeat,
  showSeatUser,
}
