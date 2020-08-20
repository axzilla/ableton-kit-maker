const os = require('os')

function isMac() {
  return os.type() === 'Darwin'
}

module.exports = { isMac }
