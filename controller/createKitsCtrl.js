const { createAdgFiles } = require('../utils/createAdgFiles')
const { createWavFiles } = require('../utils/createWavFiles')

const createKitsCtrl = async function (kitList) {
  try {
    await createAdgFiles(kitList)
    createWavFiles(kitList)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { createKitsCtrl }
