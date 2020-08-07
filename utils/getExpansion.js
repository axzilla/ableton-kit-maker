function getExpansion(file) {
  const expansionName = file.split('/')[file.split('/').length - 4].replace(' Library', '')
  const expansionPath = file.split('/Groups')[0]

  return { expansionName, expansionPath }
}

module.exports = { getExpansion }
