const { ipcMain, session } = require('electron')

const getCookieMain = ipcMain.handle('get-cookie', async function () {
  try {
    const jwtToken = await session.defaultSession.cookies.get({ url: 'http://localhost' })
    if (jwtToken.length > 0) {
      return jwtToken[0].value
    }
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { getCookieMain }
