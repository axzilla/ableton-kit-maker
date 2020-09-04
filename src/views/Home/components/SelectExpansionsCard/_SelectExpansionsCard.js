// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const SelectExpansionCards = ({ isLoading, handleGetKits }) => {
  return (
    <Card>
      <CardContent>
        <Button
          disabled={isLoading}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGetKits}
        >
          Select Expansion Pack Folder(s)
        </Button>
      </CardContent>
    </Card>
  )
}

SelectExpansionCards.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleGetKits: PropTypes.func.isRequired,
}

export default SelectExpansionCards
