// Packages
const { ipcMain } = require('electron')
const ua = require('universal-analytics')
const getMAC = require('getmac')

const handleAnalyticsMain = ipcMain.handle('handle-analytics', async (event, data) => {
  try {
    const macAdress = await getMAC.default()
    var visitor = ua('UA-154947065-4', macAdress, { strictCidFormat: false })
    visitor.pageview(data).send()
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { handleAnalyticsMain }
