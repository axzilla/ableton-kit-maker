import React from 'react'

const { dialog } = window.require('electron').remote
const fs = window.require('fs')
const path = require('path')

function App() {
  async function handleOpenFolder() {
    await dialog
      .showOpenDialog({
        properties: ['openDirectory', 'multiSelections'],
      })
      .then((result) => {
        console.log(result)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Drag & Drop</p>
        <code>or</code>
        <p
          onClick={handleOpenFolder}
          style={{ pointer: 'cursor' }}
          className="App-link"
        >
          Select Expansion Pack(s)
        </p>
      </header>
    </div>
  )
}

export default App
