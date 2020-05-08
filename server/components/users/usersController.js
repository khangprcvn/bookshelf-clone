const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./userModel')

const saltRounds = 10
const secretKey = 'token_bookshelf'

const getUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    throw new Error('Authentication failed!')
  }
  const decodedToken = jwt.verify(token, secretKey)

  const user = {
    userId: decodedToken.userId,
    username: decodedToken.username
  }

  res.send(user)
}

const signup = async (req, res, next) => {
  const { username, password } = req.body

  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const createdUser = new User({
    username,
    password: hashedPassword
  })

  await createdUser.save()

  const token = jwt.sign(
    { userId: createdUser.id, username: createdUser.username },
    secretKey,
    { expiresIn: '1h' }
  )

  res
    .status(201)
    .json({ userId: createdUser.id, username: createdUser.username, token })
}

const login = async (req, res, next) => {
  const { username, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ username })
  } catch (error) {
    throw new Error(error)
  }

  let isValidPassword = await bcrypt.compare(password, existingUser.password)

  if (!isValidPassword) return res.status(403).json('Invalid credential')

  const token = jwt.sign(
    { userId: existingUser.id, username: existingUser.username },
    secretKey,
    { expiresIn: '1h' }
  )

  res
    .status(201)
    .json({ userId: existingUser.id, username: existingUser.username, token })
}

module.exports = { signup, login, getUser }
