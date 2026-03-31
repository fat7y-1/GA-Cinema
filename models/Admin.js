const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {
    email: Admin,
    password: Admin123,
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Movie",
    //   required: true,
    // },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema)
