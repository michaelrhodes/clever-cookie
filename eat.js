var merge = require('xtend')
var cookie = require('cookie')

var defaults = {
  path: '/',
  maxAge: 0,
  sameSite: true,
  httpOnly: true
}

module.exports = eat

function eat (name, opts) {
  opts = merge(defaults, opts || {})
  return cookie.serialize(name, '', opts)
}
