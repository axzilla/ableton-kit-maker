const path = require('path')

function getExpansion(file) {
  const expansionName = file
    .split(path.sep)
    [file.split(path.sep).length - 4].replace(' Library', '')
  const expansionPath = file.split(`${path.sep}Groups`)[0]

  return { expansionName, expansionPath }
}

module.exports = { getExpansion }
