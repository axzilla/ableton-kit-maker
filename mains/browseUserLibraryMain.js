const { ipcMain } = require('electron')
const { browseUserLibraryCtrl } = require('../controller/browseUserLibraryCtrl')

const browseUserLibraryMain = ipcMain.handle('browse-user-library', function () {
  try {
    return browseUserLibraryCtrl()
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { browseUserLibraryMain }
