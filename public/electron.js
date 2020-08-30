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
    // { role: 'appMenu' },
    ...(isMac
      ? [
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
                      width: 300,
                      height: 400,
                      resizable: false,
                      minimizable: false,
                      maximizable: false,
                    })

                    aboutWindow.loadURL(
                      isDev
                        ? 'http://localhost:3000#/about'
                        : `file://${path.join(__dirname, '../build/index.html#/xxx')}`,
                    )
                  }
                },
              },

              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
      ],
    },
    // { role: 'viewMenu' }
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
    // { role: 'windowMenu' }
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
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          },
        },
      ],
    },
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
