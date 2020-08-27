const Store = require('electron-store')

function getAbletonUserLibraryPath() {
  const store = new Store()
  return store.get('abletonLibraryPath')
}

module.exports = { getAbletonUserLibraryPath }
