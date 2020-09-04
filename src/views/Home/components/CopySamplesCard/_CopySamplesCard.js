// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const CopySamplesCard = ({ isLoading, copyAudioFiles, setCopyAudioFiles }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container justify="space-between">
            <Typography variant="button">Create Audio File Copies</Typography>
            <Switch
              disabled={isLoading}
              color="primary"
              checked={copyAudioFiles}
              onChange={() => setCopyAudioFiles(!copyAudioFiles)}
            />
          </Grid>
        }
        subheader="Enable to duplicate the original files. Disable to create files pointing to the original content (Saves disk space)."
      />
    </Card>
  )
}

CopySamplesCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  copyAudioFiles: PropTypes.bool.isRequired,
  setCopyAudioFiles: PropTypes.func.isRequired,
}

export default CopySamplesCard
