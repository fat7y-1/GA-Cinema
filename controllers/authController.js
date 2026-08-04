const bcrypt = require("bcrypt")

const User = require("../models/User.js")
const { ADMIN_EMAIL } = require("../middleware/index.js")

const toPublicUser = (user) => ({
  _id: user._id,
  first: user.first,
  last: user.last,
  email: user.email,
  isAdmin: user.email === ADMIN_EMAIL,
})

const me = async (req, res) => {
  if (!req.session.user) {
    return res.json({ user: null })
  }
  res.json({ user: { ...req.session.user, isAdmin: req.session.user.email === ADMIN_EMAIL } })
}

const registerUser = async (req, res) => {
  try {
    const emailInDataBase = await User.exists({ email: req.body.email })
    if (emailInDataBase) {
      return res.status(409).json({ message: "That email is already registered." })
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    const user = await User.create({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: hashedPassword,
    })

    res.status(201).json({ user: toPublicUser(user) })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ An error has occurred registering a user!",
      error: error.message,
    })
  }
}

const signInUser = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ email: req.body.email })
    if (!userInDatabase) {
      return res.status(401).json({ message: "Invalid email or password." })
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password." })
    }

    req.session.user = {
      first: userInDatabase.first,
      last: userInDatabase.last,
      email: userInDatabase.email,
      _id: userInDatabase._id,
    }

    req.session.save(() => {
      res.json({ user: { ...req.session.user, isAdmin: userInDatabase.email === ADMIN_EMAIL } })
    })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ An error has occurred signing in a user!",
      error: error.message,
    })
  }
}

const signOut = async (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Signed out." })
  })
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: "Current password is incorrect." })
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match." })
    }

    user.password = await bcrypt.hash(req.body.newPassword, 12)
    await user.save()
    res.json({ message: "Password updated." })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ An error has occurred updating the password!",
      error: error.message,
    })
  }
}

module.exports = {
  me,
  registerUser,
  signInUser,
  signOut,
  updatePassword,
}
