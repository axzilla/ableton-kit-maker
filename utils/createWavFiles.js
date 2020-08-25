const fsx = require('fs-extra')
const path = require('path')

const { getAbletonUserLibraryPath } = require('../utils/getAbletonUserLibraryPath')

async function createWavFiles(kitList) {
  try {
    kitList.map(kit => {
      kit.samples.map(sample => {
        fsx.copySync(
          sample.path,
          path.join(
            getAbletonUserLibraryPath(),
            'Samples',
            'Imported',
            'Ableton Kit Maker',
            kit.expansionName,
            kit.kitName,
            sample.wavFile,
          ),
        )
      })
    })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { createWavFiles }
