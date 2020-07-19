const { ipcMain } = require('electron')
const { getExtensionsCtrl } = require('../controller/getExtensionsCtrl')

const getExtensionsMain = ipcMain.on('get-extensions', async function (event) {
  getExtensionsCtrl()
})

module.exports = {
  getExtensionsMain,
}
