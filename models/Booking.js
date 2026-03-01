const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, require: true },
    picture: { type: String, require: true },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Booking", bookingSchema)
