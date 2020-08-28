const { globalShortcut } = require('electron')

function disableReloadShortCuts() {
  globalShortcut.register('CommandOrControl+R', () => {
    console.log('CommandOrControl+R is pressed: Shortcut Disabled') // eslint-disable-line
  })

  globalShortcut.register('F5', () => {
    console.log('F5 is pressed: Shortcut Disabled') // eslint-disable-line
  })
}

module.exports = { disableReloadShortCuts }
