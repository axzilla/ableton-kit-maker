// Packages
import React, { useState, useEffect } from 'react'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FavoriteIcon from '@material-ui/icons/Favorite'

// Images
import icon from '../../assets/icon.png'
import noizeLogo from '../../assets/noize_logo.svg'

// Electron
const { shell, ipcRenderer } = window.require('electron')

const useStyles = makeStyles({
  icon: { width: '50px' },
  noizeLogo: { width: '200px' },
  appBar: { top: 'auto', bottom: 0 },
})

function Home() {
  const classes = useStyles()
  const [appVersion, setAppVersion] = useState('')

  useEffect(() => {
    getAppVersion()
    ipcRenderer.invoke('handle-analytics', '/about')
  }, [])

  async function getAppVersion() {
    const version = await ipcRenderer.invoke('get-app-version')
    setAppVersion(version)
  }

  return (
    <>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <img src={icon} className={classes.icon} alt="" />
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '10px' }}>
          <Typography align="center" variant="subtitle1">
            Version {appVersion}
          </Typography>
        </Grid>
        <Typography alignItems="center" variant="caption">
          Powered By
        </Typography>
        <Grid item alignItems="center">
          <img
            style={{ cursor: 'pointer' }}
            src={noizeLogo}
            className={classes.noizeLogo}
            onClick={() => shell.openExternal('https://www.noize.dev')}
            alt=""
          />
        </Grid>
      </Grid>
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="center">
            <Typography alignItems="center" variant="subtitle1">
              &copy; Ableton Kit Maker {new Date().getFullYear()} - made with&nbsp;
            </Typography>
            <FavoriteIcon color="primary" />
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Home
