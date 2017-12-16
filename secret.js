var crypto = require('crypto')

module.exports = (
  process.env.JWT_SECRET ||
  crypto.randomBytes(10).toString('hex')
)
