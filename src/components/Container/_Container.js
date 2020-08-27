import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import MuiContainer from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  },
}))

function Container({ ...rest }) {
  const classes = useStyles()

  return <MuiContainer className={classes.root} {...rest} />
}

Container.propTypes = { children: PropTypes.node.isRequired }

export default Container
