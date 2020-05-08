const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const usersAPI = require('./components/users/usersAPI')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/api/users', usersAPI)

// Connect to database
const port = process.port || 8000
mongoose
  .connect('mongodb://localhost/bookshelf', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => console.log(`Listening at port ${port}`))
  })
  .catch(err => console.error(err))
