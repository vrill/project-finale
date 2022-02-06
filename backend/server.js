import cors from 'cors'
import bcrypt from 'bcrypt'
import express from 'express'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.Promise = Promise

const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString('hex')
    }
})

const User = mongoose.model('User', UserSchema)

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Up and running.')
})

app.post('/signup', async (req, res) => {
    const { username, password } = req.body

    try {
        const salt = bcrypt.genSaltSync()

        const newUser = await new User({
            username,
            password: bcrypt.hashSync(password, salt)
        }).save()

        res.status(201).json({
            response: {
                userId: newUser._id,
                username: newUser.username,
                accessToken: newUser.accessToken
            },
            success: true
        })
    } catch (error) {
        res.status(400).json({ response: error, success: false })
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
