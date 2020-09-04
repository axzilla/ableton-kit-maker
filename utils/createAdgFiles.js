const path = require('path')
const ejs = require('ejs')
const isMac = require('./isMac')

const { writeAdgFile } = require('../utils/writeAdgFile')

async function createAdgFiles(data) {
  try {
    await Promise.all(
      data.kits.map(async kit => {
        const { kitName, expansionName, samples } = kit

        const kitData = {
          kitName,
          expansionName,
          samples,
        }

        const sample = await ejs.renderFile(path.join(__dirname, '..', 'ejs', 'base.ejs'), {
          kitData,
          isMac,
        })

        await writeAdgFile(expansionName, kitName, sample)
      }),
    )
  } catch (error) {
    if (error) throw error
  }
}

module.exports = { createAdgFiles }
