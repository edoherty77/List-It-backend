const express = require('express')
const routes = require('./routes')
const cors = require('cors')
// const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('yo')
})

// middleware - API routes
app.use('/api/v1', routes.categories)
app.use('/api/v1/items', routes.items)

const CONNECTION_URL =
  'mongodb+srv://evan:evan@list-it-db.tjkfv.mongodb.net/List-It-DB?retryWrites=true&w=majority'
const PORT = process.env.PORT || 4000

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`),
    ),
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
