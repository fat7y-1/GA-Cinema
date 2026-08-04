const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@email.com"

const isSignedIn = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  res.status(401).json({ message: "You must be signed in." })
}

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.email === ADMIN_EMAIL) {
    return next()
  }
  res.status(403).json({ message: "Admins only." })
}

module.exports = {
  isSignedIn,
  isAdmin,
  ADMIN_EMAIL,
}
