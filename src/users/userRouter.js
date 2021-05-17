const express = require('express')
const xss = require('xss')
const UserService = require('./userService')

const bodyParser = express.json()

serializeUser = (user) => ({
    email: xss(user.email),
    firstname: xss(user.firstname),
    lastname: xss(user.lastname),
    username: xss(user.username),
    password: xss(user.password),
    phone: xss(user.phone)
})

userRouter = express.Router()

userRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UserService.getAllUsers(knexInstance)
            .then(users => {
                res.json(users)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const { id, email, firstname, lastname, username, password, phone } = req.body
        const newUser = {id, email, firstname, lastname, username, password, phone}

        for (const [key, value] of Object.entries(newUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: {message: `Missing ${key} in request body`}
                })
            }
        }

        const knexInstance = req.app.get('db')

        UserService.insertUser(knexInstance, newUser)
            .then(user => {
                res
                    .status(200)
                    .json(serializeUser(user))
            })
            .catch(next)
    })

module.exports = userRouter
