const bcrypt = require("bcrypt")

const User = require("../models/User.js")

const showSignUpPage = (req, res) => {
  try {
    res.render("auth/sign-up.ejs")
  } catch (error) {
    res.status(404).json({
      message: "⚠️ A error has occurred showing the Sign Up Page!",
      error: error.message,
    })
  }
}
const registerUser = async (req, res) => {
  try {
    const emailInDataBase = await User.exists({ email: req.body.email })

    if (emailInDataBase) {
      return res.render("../views/errorPage/taken.ejs")
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.render("../views/errorPage/passwordMismatch.ejs")
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    req.body.password = hashedPassword

    const user = await User.create(req.body)

    res.render("auth/thanks.ejs")
  } catch (error) {
    es.status(404).json({
      message: "⚠️ A error has occurred showing the Sign Up Page!",
      error: error.message,
    })
  }
}

const showSignInPage = async (req, res) => {
  try {
    res.render("./auth/sign-in.ejs")
  } catch (error) {
    res.status(404).json({
      message: "⚠️ A error has occurred showing the Sign In Page!",
      error: error.message,
    })
  }
}

const signInUser = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ email: req.body.email })
    if (!userInDatabase) {
      return res.render("../views/errorPage/loginFailed.ejs")
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.render("../views/errorPage/loginFailed.ejs")
    }
    req.session.user = {
      first: userInDatabase.first,
      email: userInDatabase.email,
      _id: userInDatabase._id,
    }

    req.session.save(() => {
      res.redirect("/")
    })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ An error has occurred signing in a user!",
      error: error.message,
    })
  }
}

const signOut = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/")
    })
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}

const showUpdatePage = async (req, res) => {
  try {
    res.render("./auth/update-password.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred not find the page!", error.message)
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.render("../views/errorPage/noUser.ejs")
    }

    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    )

    if (!validPassword) {
      return res.render("../views/errorPage/oldPasswordIncorrect.ejs", {
        userId: req.params.id,
      })
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.render("../views/errorPage/passwordMismatchNew.ejs", {
        userId: req.params.id,
      })
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12)
    user.password = hashedPassword
    await user.save()
    res.render("auth/confirm.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}

const showAdminPage = async (req, res) => {
  try {
    res.render("./admin/admin.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred login a admin!", error.message)
  }
}

module.exports = {
  showSignUpPage,
  registerUser,
  showSignInPage,
  signInUser,
  signOut,
  updatePassword,
  showUpdatePage,
  showAdminPage,
}
