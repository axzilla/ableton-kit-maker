import React from 'react'

import Typography from '@material-ui/core/Typography'

const { ipcRenderer } = window.require('electron')

function Home() {
  function handleGetExtensions() {
    ipcRenderer.send('get-extensions')
  }

  return (
    <>
      <Typography>Drag & Drop</Typography>
      <Typography>or</Typography>
      <Typography onClick={handleGetExtensions}>
        Select Expansion Pack(s)
      </Typography>
    </>
  )
}

export default Home
