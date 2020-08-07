const { getExpansion } = require('./getExpansion')
const { getKit } = require('./getKit')
const { getSamples } = require('./getSamples')

function getKitList(mxgrpPaths, wavPaths) {
  let kitList = []

  mxgrpPaths.map(file => {
    const kit = getKit(file)
    const expansion = getExpansion(file)
    const samples = getSamples(wavPaths, kit.kitName)

    kitList.push({
      ...kit,
      ...expansion,
      samples,
    })
  })

  return kitList
}

module.exports = { getKitList }
