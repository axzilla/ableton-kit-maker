const os = require('os')
const path = require('path')

const isMac = require('../utils/isMac')

function getUserLib() {
  const userLib = path.join(os.homedir(), isMac ? 'Music' : 'Documents', 'Ableton', 'User Library')
  return userLib
}

module.exports = { getUserLib }
