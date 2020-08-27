import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import MuiLink from '@material-ui/core/Link'

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: props => (props.underlined ? 'underlined' : 'none'),
    },
  },
})

function Link({ children, color, href, underlined }) {
  const classes = useStyles({ underlined })

  return (
    <MuiLink className={classes.link} href={href} color={color} target="_blank">
      {children}
    </MuiLink>
  )
}

Link.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  href: PropTypes.string,
  underlined: PropTypes.bool,
}

export default Link
