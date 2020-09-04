const { ipcMain } = require('electron')
const { createKitsCtrl } = require('../controller/createKitsCtrl')

const getKitsMain = ipcMain.handle('create-kits', function (event, data) {
  try {
    return createKitsCtrl(data)
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { getKitsMain }
