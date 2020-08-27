const { ipcMain, session } = require('electron')

const setCookieMain = ipcMain.handle('set-cookie', function (event, jwtToken) {
  try {
    const cookie = { url: 'http://localhost', name: 'jwtToken', value: jwtToken }
    session.defaultSession.cookies.set(cookie)
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { setCookieMain }
