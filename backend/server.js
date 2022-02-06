import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Up and running.')
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
