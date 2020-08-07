const ejs = require('ejs')
const fsx = require('fs-extra')

async function createCacheFiles(sampleName, padPath, data) {
  await fsx.writeFile(`cache/${sampleName}.xml`, await ejs.renderFile(padPath, { ...data }))
}

module.exports = { createCacheFiles }
