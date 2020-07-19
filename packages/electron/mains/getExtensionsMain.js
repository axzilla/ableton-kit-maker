const { ipcMain } = require('electron')
const { getExtensionsCtrl } = require('../controller/getExtensionsCtrl')

const getExtensionsMain = ipcMain.handle('get-extensions', function () {
  try {
    return getExtensionsCtrl()
  } catch (error) {
    if (error) throw error
  }
})

module.exports = {
  getExtensionsMain,
}
