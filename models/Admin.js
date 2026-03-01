const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {
    email:Admin,
    password: Admin123
  },
  { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema)
