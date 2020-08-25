const { ipcMain } = require('electron')

const { getAbletonUserLibraryPath } = require('../utils/getAbletonUserLibraryPath')

const getAbletonUserLibraryPathb = ipcMain.handle('get-user-lib', function () {
  try {
    return getAbletonUserLibraryPath()
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { getAbletonUserLibraryPathb }
