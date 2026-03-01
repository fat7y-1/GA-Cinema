require("dotenv").config({ quiet: true })
const express = require("express")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

const { MongoStore } = require("connect-mongo")

const path = require("path")

// middleware

// express library
const app = express()

//Router

const db = require("./db")

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

app.listen(PORT, () => {
  console.log(`🎬 Mongoose Server is on Port ${PORT}......`)
})
