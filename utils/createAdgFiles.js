const path = require('path')
const ejs = require('ejs')

const { writeAdgFile } = require('../utils/writeAdgFile')

async function createAdgFiles(kitList) {
  await Promise.all(
    kitList.map(async kit => {
      const { kitName, expansionName, samples } = kit

      const kitData = {
        kitName,
        expansionName,
        samples,
      }

      const sample = await ejs.renderFile(path.join(__dirname, '..', 'ejs', 'base.ejs'), {
        kitData,
      })

      await writeAdgFile(expansionName, kitName, sample)
    }),
  )
}

module.exports = { createAdgFiles }
