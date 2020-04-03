require('dotenv').config()
const express = require('express')
// const path = require('path')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
process.env.NODE_ENV !== 'production' && app.use(morgan('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(methodOverride('_method'))

app.use("/api/user", require('./routes/user.route'))
// app.use('/api/auth', require('./routes/auth.route'))
// app.use('/', posts.index)
// app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))



const start = async () => {
  const PORT = process.env.PORT || 3000
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.error('Server error', e.message);
  }
}

start()
