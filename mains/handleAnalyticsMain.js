// Packages
const { ipcMain } = require('electron')
const ua = require('universal-analytics')
const getMAC = require('getmac')

const handleAnalyticsMain = ipcMain.handle('handle-analytics', async (event, data) => {
  try {
    const googleTrackingId = process.env.GOOGLE_TRACKING_ID
    const macAdress = await getMAC.default()
    var visitor = ua(googleTrackingId, macAdress, { strictCidFormat: false })
    visitor.pageview(data).send()
  } catch (error) {
    if (error) throw error
  }
})

module.exports = { handleAnalyticsMain }
