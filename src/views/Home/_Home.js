import React from 'react'

import Typography from '@material-ui/core/Typography'

const { ipcRenderer } = window.require('electron')

function Home() {
  async function handleGetExtensions() {
    const extensions = await ipcRenderer.invoke('get-extensions')
    console.log(extensions)
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
