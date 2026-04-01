require("dotenv").config({ quiet: true })

const express = require("express")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

// const dns = require("dns")
// dns.setServers(["8.8.8.8", "1.1.1.1"])

const { MongoStore } = require("connect-mongo")

const path = require("path")

// middleware
const middleware = require("./middleware/index")

// express library
const app = express()

//Router
const authRouter = require("./routes/authRouter")

const adminRouter = require("./routes/adminRouter")

const db = require("./db")
const Movie = require("./models/Movie")

const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)
app.use(middleware.passUserToView)
app.use("/auth", authRouter)
app.use("/admin", adminRouter)

app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({})
    res.render("./index.ejs", { movies })
  } catch (error) {}
})

app.listen(PORT, () => {
  console.log(`🎬 Mongoose Server is on Port ${PORT}......`)
})
