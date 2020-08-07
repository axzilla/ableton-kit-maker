const path = require('path')
const ejs = require('ejs')

const { writeAdgDir } = require('../utils/writeAdgDir')
const { writeAdgFile } = require('../utils/writeAdgFile')
const { createCacheFiles } = require('../utils/createCacheFiles')
const { unlinkTemporaryPadPaths } = require('../utils/unlinkTemporaryPadPaths')

async function createAdgFiles(kitList) {
  const padPath = path.join(__dirname, '..', 'ejs', 'pad.ejs')

  await Promise.all(
    kitList.map(async kit => {
      const { kitName, expansionName } = kit
      let temporaryPadPaths = []
      let padString = ''

      await Promise.all(
        kit.samples.map(async (sample, index) => {
          temporaryPadPaths.push(`cache/${sample.name}.xml`)

          const data = {
            kitName,
            expansionName,
            receivingNote: 92 - index, // C1
            drumBranchPresetId: 0 + index,
            sample,
          }

          await createCacheFiles(sample.name, padPath, data)

          const renderedPadString = await ejs.renderFile(padPath, { ...data })

          padString += renderedPadString
        }),
      )

      await writeAdgDir(kit.expansionName)
      await writeAdgFile(kit.expansionName, kit.kitName, padString)
      await unlinkTemporaryPadPaths(temporaryPadPaths)
      padString = ''
    }),
  )
}

module.exports = { createAdgFiles }
