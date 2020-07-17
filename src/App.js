import React from 'react'
import logo from './logo.png'
import './App.css'

const { dialog } = window.require('electron').remote
const fs = window.require('fs')
const path = require('path')

function App() {
  function saveFile() {
    dialog
      .showSaveDialog({
        title: 'Select the File Path to save',
        defaultPath: path.join(__dirname, '../assets/sample.txt'),
        buttonLabel: 'hjkh',
        // Restricting the user to only Text Files.
        filters: [
          {
            name: 'Text Files',
            extensions: ['txt', 'docx'],
          },
        ],
        properties: [],
      })
      .then((file) => {
        // Stating whether dialog operation was cancelled or not.
        console.log(file.canceled)
        if (!file.canceled) {
          console.log(file.filePath.toString())

          // Creating and Writing to the sample.txt file
          fs.writeFile(
            file.filePath.toString(),
            'This is a Sample File',
            function (err) {
              if (err) throw err
              console.log('Saved!')
            }
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Drag & Drop Maschine Kit Folders</p>
        <code>or</code>
        <p
          onClick={saveFile}
          style={{ pointer: 'cursor' }}
          className="App-link"
        >
          Select Folders
        </p>
      </header>
    </div>
  )
}

export default App
