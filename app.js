const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()
const app = express()
const port = 5000
const route = require('./apiRoutes')
app.use(express.urlencoded({
    extended: true
  })
);
const corsOptions = {
  origin: '*',
  credentials: true,
  exposedHeaders: ["Set-Cookie"]
 };
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(morgan('combined'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})