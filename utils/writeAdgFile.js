const fsx = require('fs-extra')
const path = require('path')

const { getUserLib } = require('./getUserLib')

async function writeAdgFile(expansionName, kitName, padString) {
  const headerPath = path.join(__dirname, '..', 'ejs', 'header.ejs')
  const footerPath = path.join(__dirname, '..', 'ejs', 'footer.ejs')

  const headerString = await fsx.readFile(headerPath, 'UTF-8')
  const footerString = await fsx.readFile(footerPath, 'UTF-8')

  const concatedAdg = headerString.concat(padString, footerString)

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
    concatedAdg,
    'UTF-8',
  )
}

module.exports = { writeAdgFile }
