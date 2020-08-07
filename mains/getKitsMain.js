const { ipcMain } = require('electron')
const { getKitsCtrl } = require('../controller/getKitsCtrl')

const getKitsMain = ipcMain.handle('get-kits', function () {
  try {
    return getKitsCtrl()
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { getKitsMain }
