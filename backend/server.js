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

// const PlantSchema = new mongoose.Schema({
//     message: {
//         type: String,
//         required: true
//     }
// })

// const Plant = mongoose.model('Plant', PlantSchema)

const port = process.env.PORT || 8080
const app = express()

// const allowedDomains = [
//     'https://project.netlify.com',
//     'https://project.herokuapp.com'
// ]

// app.use(cors({
//     origin: (origin, callback) => {
//         if (allowedDomains.includes(origin)) {
//             return callback(null, true)
//         } else {
//             return callback(new Error('Unallowed domain.'), false)
//         }
//     }
// }))

app.use(cors())
app.use(express.json())

const authenticateUser = async (req, res, next) => {
    const accessToken = req.header('Authorization')

    try {
        const user = await User.findOne({ accessToken })

        if (user) {
            next()
        } else {
            res.status(401).json({ response: { message: 'You need to be logged in to access this content.' }, success: false })
        }
    } catch (error) {
        res.status(400).json({ response: error, success: false })
    }
}

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

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                response: {
                    userId: user._id,
                    username: user.username,
                    accessToken: user.accessToken
                },
                success: true
            })
        } else {
            res.status(404).json({ response: 'Invalid credentials. Try again.', success: false })
        }
    } catch (error) {
        res.status(400).json({ response: error, success: false })
    }
})

// app.get('/main', authenticateUser)
// app.get('/main', (req, res) => {
//     res.send('Logged in welcome screen')
// })

// Section to list plants/todo
// app.get('/plants', authenticateUser)
// app.get('/plants', async (req, res) => {
//     const plants = await Plant.find({})
//     res.status(201).json({ response: plants, success: true })
// })

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
