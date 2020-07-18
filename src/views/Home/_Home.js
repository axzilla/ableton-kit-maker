import React from 'react'

import Typography from '@material-ui/core/Typography'

const { dialog } = window.require('electron').remote
const fs = window.require('fs')
const path = require('path')

function Home() {
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
    <>
      <Typography>Drag & Drop</Typography>
      <Typography>or</Typography>
      <Typography onClick={handleOpenFolder}>
        Select Expansion Pack(s)
      </Typography>
    </>
  )
}

export default Home
