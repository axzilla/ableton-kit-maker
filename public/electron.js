require('dotenv').config()

const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer')
const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const { setSettings } = require('../utils/setSettings')

require('./../mains/getKitsMain')
require('./../mains/createKitsMain')
require('./../mains/getAbletonUserLibraryPathMain')
require('./../mains/browseUserLibraryMain')

app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then(name => {
      setSettings()
      console.log(`Added Extension:  ${name}`) // eslint-disable-line no-console
    })
    .catch(error => console.log('An error occurred: ', error)) // eslint-disable-line no-console
})

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.on('closed', () => (mainWindow = null))
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
