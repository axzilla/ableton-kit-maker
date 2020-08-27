const path = require('path')
const os = require('os')
const Store = require('electron-store')

const isMac = require('./isMac')

function setSettings(userPath) {
  try {
    const store = new Store()

    const initialPath = path.join(
      os.homedir(),
      isMac ? 'Music' : 'Documents',
      'Ableton',
      'User Library',
    )

    if (!store.get('abletonLibraryPath')) {
      store.set('abletonLibraryPath', initialPath)
    }

    if (userPath) {
      store.set('abletonLibraryPath', userPath)
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { setSettings }
