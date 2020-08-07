const { ipcMain } = require('electron')
const { createKitsCtrl } = require('../controller/createKitsCtrl')

const getKitsMain = ipcMain.handle('create-kits', function (event, kitList) {
  try {
    return createKitsCtrl(kitList)
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { getKitsMain }
