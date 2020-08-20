const pth = require('path')

function getSamples(wavFiles, kitName) {
  return wavFiles
    .filter(wavFile => {
      return wavFile.includes(kitName.replace(' ', '')) || wavFile.includes(kitName)
    })
    .map(waveFile => {
      const wavFile = pth.basename(waveFile)
      const name = wavFile.replace('.wav', '')
      const path = waveFile

      return { wavFile, name, path }
    })
}

module.exports = { getSamples }
