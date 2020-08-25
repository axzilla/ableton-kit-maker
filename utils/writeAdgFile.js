const fsx = require('fs-extra')
const path = require('path')

const { getAbletonUserLibraryPath } = require('./getAbletonUserLibraryPath')

async function writeAdgFile(expansionName, kitName, sample) {
  await fsx.ensureDir(
    path.join(
      getAbletonUserLibraryPath(),
      'Presets',
      'Instruments',
      'Drum Rack',
      'Ableton Kit Maker',
      expansionName,
    ),
  )

  await fsx.writeFile(
    path.join(
      getAbletonUserLibraryPath(),
      'Presets',
      'Instruments',
      'Drum Rack',
      'Ableton Kit Maker',
      expansionName,
      `${kitName}.adg`,
    ),
    sample,
    'UTF-8',
  )
}

module.exports = { writeAdgFile }
