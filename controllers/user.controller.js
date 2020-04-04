const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const hashPassword = async password => await bcrypt.hash(password, 10)

module.exports = class UserController {

  static async register(req, res) {
    try {
      await check('email', 'Incorrect email address')
        .isEmail()
        .custom(email => User.findOne({ email }).then(user => {
          if (user) {
            return Promise.reject('A user with the given email already exists')
          }
        }))
        .run(req)
      await check('password', 'Your password must be at least 6 characters').isLength({ min: 6 }).run(req)

      const result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(400).json({ error: result.errors[0].msg || 'Incorrect data', errors: result.array() })
      }

      const { email, password } = req.body
      const user = new User({
        email,
        password: await hashPassword(password),
      })

      await user.save()
      res.status(201).json({ message: 'User was registered' })
    } catch (e) {
      console.error(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async login(req, res, next) {
    try {
      await check('email', 'Incorrect email address').normalizeEmail().isEmail().run(req)
      await check('password', 'Your password must be at least 6 characters').exists().run(req)

      const result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(400).json({ error: result.errors[0].msg || 'Incorrect data', errors: result.array() })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ error: 'User not found' })
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'User not found' })
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })
    } catch (e) {
      console.error(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

}
