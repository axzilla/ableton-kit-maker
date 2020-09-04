const fsx = require('fs-extra')
const path = require('path')

const { getAbletonUserLibraryPath } = require('../utils/getAbletonUserLibraryPath')

async function createWavFilesLink(data) {
  try {
    data.kits.map(kit => {
      kit.samples.map(sample => {
        fsx.ensureLink(
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

module.exports = { createWavFilesLink }
