// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

const LibraryCard = ({ isLoading, handleBrowseUserLibrary, userLib }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container justify="space-between">
            <Typography variant="button">Location of User Library</Typography>
            <Button
              disabled={isLoading}
              onClick={handleBrowseUserLibrary}
              variant="contained"
              size="small"
            >
              Browse
            </Button>
          </Grid>
        }
        subheader={userLib}
      />
    </Card>
  )
}

LibraryCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleBrowseUserLibrary: PropTypes.func.isRequired,
  userLib: PropTypes.string.isRequired,
}

export default LibraryCard
