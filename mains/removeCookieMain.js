const { ipcMain, session } = require('electron')

const removeCookie = ipcMain.handle('remove-cookie', function () {
  try {
    session.defaultSession.cookies.remove('http://localhost', 'jwtToken')
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { removeCookie }
