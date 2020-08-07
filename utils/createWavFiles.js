const fsx = require('fs-extra')
const path = require('path')

const { getUserLib } = require('../utils/getUserLib')

async function createWavFiles(kitList) {
  try {
    kitList.map(kit => {
      kit.samples.map(sample => {
        fsx.copy(
          sample.path,
          path.join(
            getUserLib(),
            'Samples',
            'Imported',
            'Ableton Kit Maker',
            kit.expansionName,
            kit.kitName,
            sample.path.split('/')[sample.path.split('/').length - 1],
          ),
        )
      })
    })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { createWavFiles }
