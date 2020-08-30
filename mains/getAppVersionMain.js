const { app, ipcMain } = require('electron')

const getAppVersionMain = ipcMain.handle('get-app-version', async function () {
  try {
    return app.getVersion()
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { getAppVersionMain }
