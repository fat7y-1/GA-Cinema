const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    language: { type: String, require: true },
    picture: { type: String, require: true },
    userTicket: { type: Number, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    selectedSeats: { type: [Number], default: [] },
    isDone: { type: Boolean },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Booking", bookingSchema)
