const fsx = require('fs-extra')
const path = require('path')

const { getUserLib } = require('./getUserLib')

async function writeAdgFile(expansionName, kitName, sample) {
  await fsx.ensureDir(
    path.join(
      getUserLib(),
      'Presets',
      'Instruments',
      'Drum Rack',
      'Ableton Kit Maker',
      expansionName,
    ),
  )

  await fsx.writeFile(
    path.join(
      getUserLib(),
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
