require("dotenv").config({ quiet: true })

const express = require("express")
const morgan = require("morgan")
const session = require("express-session")

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const { MongoStore } = require("connect-mongo")

const path = require("path")

// express library
const app = express()

//Router
const authRouter = require("./routes/authRouter")
const adminRouter = require("./routes/adminRouter")
const movieRouter = require("./routes/movieRouter")
const userRouter = require("./routes/userRouter")
const seatRouter = require("./routes/seatRouter")

require("./db")

const PORT = process.env.PORT ? process.env.PORT : 3000
const clientDist = path.join(__dirname, "client", "dist")

const isProduction = process.env.NODE_ENV === "production"

app.set("trust proxy", 1)
app.use(express.json())
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      secure: isProduction,
      sameSite: "lax",
    },
  })
)

app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/movies", movieRouter)
app.use("/api/bookings", userRouter)
app.use("/api/seats", seatRouter)

// Serve the built React app in production
app.use(express.static(clientDist))
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"))
})

app.listen(PORT, () => {
  console.log(`🎬 Mongoose Server is on Port ${PORT}......`)
})
