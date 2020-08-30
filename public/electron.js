require('dotenv').config()

// Native
const path = require('path')

// Packages
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer')
const { app, BrowserWindow, Menu } = require('electron')
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
require('./../mains/getAppVersionMain')

let mainWindow
let aboutWindow

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

  const isMac = process.platform === 'darwin'
  const template = [
    {
      label: app.name,
      submenu: [
        {
          label: 'About Kit Maker',
          click() {
            if (!aboutWindow) {
              aboutWindow = new BrowserWindow({
                webPreferences: { nodeIntegration: true },
                title: 'About Kit Maker',
                width: 400,
                height: 300,
                resizable: false,
                minimizable: false,
                maximizable: false,
              })

              aboutWindow.loadURL(
                isDev
                  ? 'http://localhost:3000#/about'
                  : `file://${path.join(__dirname, '../build/index.html#/about')}`,
              )

              aboutWindow.on('close', function () {
                aboutWindow = null
              })
            }
          },
        },

        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'File',
      submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
          : [{ role: 'close' }]),
      ],
    },
    // {
    //   role: 'help',
    //   submenu: [
    //     {
    //       label: 'Learn More',
    //       click: async () => {
    //         const { shell } = require('electron')
    //         await shell.openExternal('https://ableton-kit-maker.noize.dev')
    //       },
    //     },
    //   ],
    // },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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
