const { dialog } = require('electron')
const { getFileList } = require('../utils/getFileList')
const { getFileListWithExtension } = require('../utils/getFileListWithExtension')
const { getKitList } = require('../utils/getKitList')

const getKitsCtrl = async function () {
  try {
    const extensions = await dialog.showOpenDialog({
      title: 'Select Library Folders',
      properties: ['openDirectory', 'multiSelections'],
    })

    let allFiles = []

    extensions.filePaths.map(filePath => {
      allFiles = [...allFiles, ...getFileList(filePath)]
    })

    const mxgrpPaths = getFileListWithExtension(allFiles, 'mxgrp')
    const wavPaths = getFileListWithExtension(allFiles, 'wav')
    const kitList = getKitList(mxgrpPaths, wavPaths)

    return kitList
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { getKitsCtrl }
