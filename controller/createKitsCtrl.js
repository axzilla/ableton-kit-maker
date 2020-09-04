const { createAdgFiles } = require('../utils/createAdgFiles')
const { createWavFiles } = require('../utils/createWavFiles')
const { createWavFilesLink } = require('../utils/createWavFilesLink')

const createKitsCtrl = async function (data) {
  try {
    await createAdgFiles(data)
    data.copyAudioFiles ? createWavFiles(data) : createWavFilesLink(data)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { createKitsCtrl }
