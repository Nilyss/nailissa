// ********** imports **********
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
let whitelist = ['http://localhost:4200', 'https://nailissa.fr']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,POST,DELETE',
  preflightContinue: false,
}
const {
  isAccessGranted,
  isValidUser,
} = require('./middleware/authentication/jsonwebtoken')

// routes
const userRoutes = require('./routes/user')
const provisionRoutes = require('./routes/provisions')
const calendarRoutes = require('./routes/calendar')

//  config
const port = parseInt(process.env.PORT, 10) || 8000
const baseUrl = process.env.BASE_URL + port + '/api'

// ********** Init Server **********

const app = express()

//db
require('./db/mongoose')(app)

// middleware
app
  .use(cors(corsOptions))
  .use(express.json())
  .use(cookieParser())
  // Routes
  .use(provisionRoutes)
  // Verify Token
  .get('*', isValidUser)
  .get('/api/jwtid', isAccessGranted)
  .use(userRoutes)
  .use(calendarRoutes)

// starting app
app.listen(port, () => {
  console.log(
    `App is now listening on port ${port},  the API base url is ${baseUrl}`
  )
})
