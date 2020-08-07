function getFileListWithExtension(files, extension) {
  return files.filter(file => {
    return file.split('.')[1].toLowerCase() === extension
  })
}

module.exports = { getFileListWithExtension }
