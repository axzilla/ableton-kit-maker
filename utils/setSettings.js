const fs = require('fs')
const path = require('path')
const os = require('os')
const { app } = require('electron')

const isMac = require('./isMac')

function setSettings(userPath) {
  try {
    const abletonLibraryPath = path.join(
      os.homedir(),
      isMac ? 'Music' : 'Documents',
      'Ableton',
      'User Library',
    )

    const userData = app.getPath('userData')

    if (!fs.existsSync(`${userData}/settings.json`)) {
      const initialSettings = { abletonLibraryPath }

      fs.writeFile(`${userData}/settings.json`, JSON.stringify(initialSettings), error => {
        if (error) throw error
      })
    }

    if (userPath) {
      const settings = JSON.parse(fs.readFileSync(`${userData}/settings.json`))
      settings.abletonLibraryPath = userPath

      fs.writeFile(`${userData}/settings.json`, JSON.stringify(settings), error => {
        if (error) throw error
      })
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { setSettings }
