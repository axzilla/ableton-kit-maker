const fsx = require('fs-extra')
const path = require('path')

const { getUserLib } = require('./getUserLib')

async function writeAdgDir(expansionName) {
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
}

module.exports = { writeAdgDir }
