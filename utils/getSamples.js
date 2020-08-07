function getSamples(wavFiles, kitName) {
  return wavFiles
    .filter(wavFile => {
      return wavFile.includes(kitName.replace(' ', '')) || wavFile.includes(kitName)
    })
    .map(waveFile => {
      const wavFile = waveFile.slice(waveFile.lastIndexOf('/') + 1)
      const name = wavFile.replace('.wav', '')
      const path = waveFile

      return { wavFile, name, path }
    })
}

module.exports = { getSamples }
