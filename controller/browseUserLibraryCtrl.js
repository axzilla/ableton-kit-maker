const { dialog } = require('electron')
const { setSettings } = require('../utils/setSettings')

const browseUserLibraryCtrl = async function () {
  try {
    const userLibrary = await dialog.showOpenDialog({
      title: 'Select Library Folders',
      properties: ['openDirectory'],
    })

    setSettings(userLibrary.filePaths[0])
    return userLibrary.filePaths[0]
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { browseUserLibraryCtrl }
