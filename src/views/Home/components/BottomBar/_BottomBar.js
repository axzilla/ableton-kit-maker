// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  appBar: { top: 'auto', bottom: 0 },
  button: { margin: '10px' },
})

const BottomBar = ({ kits, isLoading, handleResetKits, handleCreateKits }) => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" color="secondary" className={classes.appBar}>
      {isLoading && <LinearProgress />}
      <Toolbar>
        <Grid container justify="center">
          <Button
            disabled={kits.length < 1 || isLoading}
            onClick={handleResetKits}
            variant="contained"
            className={classes.button}
            color="secondary"
          >
            Reset
          </Button>
          <Button
            disabled={kits.length < 1 || isLoading}
            onClick={handleCreateKits}
            variant="contained"
            className={classes.button}
            color="primary"
          >
            Create Kits
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

BottomBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  kits: PropTypes.array.isRequired,
  handleResetKits: PropTypes.func.isRequired,
  handleCreateKits: PropTypes.func.isRequired,
}

export default BottomBar
