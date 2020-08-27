const { ipcMain, session } = require('electron')
const Store = require('electron-store')

const handleSignInMain = ipcMain.handle('sign-in', function (event, jwtToken) {
  try {
    const store = new Store()
    store.set('jwtToken', jwtToken)
    const cookie = { url: 'http://localhost', name: 'jwtToken', value: jwtToken }
    session.defaultSession.cookies.set(cookie)
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { handleSignInMain }
