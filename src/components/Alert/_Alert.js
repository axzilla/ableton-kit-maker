import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { useAlert } from '../../contexts/AlertContext'
import isEmpty from '../../utils/isEmpty'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import amber from '@material-ui/core/colors/amber'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

function MySnackbarContentWrapper(props) {
  const classes = useStyles()
  const { className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
}

function CustomizedSnackbars() {
  const { alert, setAlert } = useAlert()

  useEffect(() => {
    if (!isEmpty(alert && alert.message)) {
      setOpen(true)
    }
  }, [alert && alert.message])

  const [open, setOpen] = React.useState(false)

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setAlert({ message: null, variant: null })
    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={(alert && alert.variant) || 'success'}
          message={alert && alert.message}
        />
      </Snackbar>
    </div>
  )
}

export default CustomizedSnackbars
