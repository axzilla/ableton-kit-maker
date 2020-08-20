const path = require('path')

function getKit(file) {
  const kitName = file
    .slice(file.lastIndexOf(path.sep) + 1)
    .split('.')[0]
    .replace(' Kit', '')

  const kitPath = file

  return { kitName, kitPath }
}

module.exports = { getKit }
