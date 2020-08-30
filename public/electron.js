require('dotenv').config()

// Native
const path = require('path')

// Packages
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer')
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

// Utils
const { setSettings } = require('../utils/setSettings')
const { disableReloadShortCuts } = require('../utils/disableReloadShortCuts')

// Mains
require('./../mains/getKitsMain')
require('./../mains/createKitsMain')
require('./../mains/getAbletonUserLibraryPathMain')
require('./../mains/browseUserLibraryMain')
require('./../mains/getCookieMain')
require('./../mains/signInMain')
require('./../mains/signOutMain')

let mainWindow

app.whenReady().then(() => {
  try {
    setSettings()

    if (!isDev) {
      installExtension(REDUX_DEVTOOLS)
      disableReloadShortCuts()
    }
  } catch (error) {
    if (error) throw error
  }
})

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      devTools: isDev ? true : false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.removeMenu()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

module.exports = { app }
