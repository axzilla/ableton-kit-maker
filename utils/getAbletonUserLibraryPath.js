const fs = require('fs')
const { app } = require('electron')

function getAbletonUserLibraryPath() {
  const userData = app.getPath('userData')
  const settings = JSON.parse(fs.readFileSync(`${userData}/settings.json`))
  const abletonLibraryPath = settings.abletonLibraryPath
  return abletonLibraryPath
}

module.exports = { getAbletonUserLibraryPath }
