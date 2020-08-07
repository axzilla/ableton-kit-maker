const fsx = require('fs-extra')

async function unlinkTemporaryPadPaths(temporaryPadPaths) {
  await temporaryPadPaths.map(path => fsx.unlink(path))
}

module.exports = { unlinkTemporaryPadPaths }
