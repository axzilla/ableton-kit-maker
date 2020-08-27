import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import logo from '../../assets/icon.png'

import { signOutReducer } from '../../slices/authSlice'

import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: { height: '35px' },
}))

function ToolBar({ history }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  function handleLogout() {
    dispatch(signOutReducer())
    history.push('/signin')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <img className={classes.logo} src={logo} />
          <Typography variant="h6" className={classes.title} />
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
          <AccountCircleIcon />
          <Typography>{user.username}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ToolBar.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(ToolBar)
