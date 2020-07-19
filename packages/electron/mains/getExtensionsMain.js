const { ipcMain } = require('electron')
const { getExtensionsCtrl } = require('../controller/getExtensionsCtrl')

const getExtensionsMain = ipcMain.handle('get-extensions', function () {
  return getExtensionsCtrl()
})

module.exports = {
  getExtensionsMain,
}
