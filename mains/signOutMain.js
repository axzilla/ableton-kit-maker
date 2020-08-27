const { ipcMain, session } = require('electron')
const Store = require('electron-store')

const signOut = ipcMain.handle('sign-out', function () {
  try {
    const store = new Store()
    store.delete('jwtToken')
    session.defaultSession.cookies.remove('http://localhost', 'jwtToken')
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { signOut }
