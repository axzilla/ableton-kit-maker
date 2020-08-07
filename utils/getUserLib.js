const os = require('os')
const path = require('path')

function getUserLib() {
  const userLib = path.join(
    os.homedir(),
    os.type() === 'Darwin' ? 'Music' : 'Documents',
    'Ableton',
    'User Library',
  )
  return userLib
}

module.exports = { getUserLib }
