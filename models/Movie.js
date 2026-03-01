const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, require: true },
    picture: { type: String, require: true },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Movie", movieSchema)
