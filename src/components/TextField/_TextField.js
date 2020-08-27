import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import MuiTextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  formControl: { width: '100%' },
  error: { lineHeight: '20px', margin: '0', textTransform: 'uppercase', fontWeight: 'bold' },
})

function TextField({
  type,
  value,
  name,
  onChange,
  onKeyDown,
  placeholder,
  error,
  multiline,
  rowsMax,
  rows,
}) {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl} error>
      <MuiTextField
        color="secondary"
        type={type || 'text'}
        margin="dense"
        variant="outlined"
        error={error ? true : false}
        name={name}
        value={value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        multiline={multiline}
        rowsMax={rowsMax}
        rows={rows}
        placeholder={placeholder}
        fullWidth
      />
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </FormControl>
  )
}

TextField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  rowsMax: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
}

export default TextField
