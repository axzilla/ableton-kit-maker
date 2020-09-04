// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'

const KitList = ({ kits, isLoading, handleDeleteKit }) => {
  return kits.length > 0 ? (
    <Grid item xs={12}>
      <List dense={true}>
        {kits.map((kit, index) => {
          return (
            <ListItem key={kit.kitName} button>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Kit: ${kit.kitName}`}
                secondary={`Expansion: ${kit.expansionName}`}
              />
              <ListItemSecondaryAction>
                <IconButton disabled={isLoading} onClick={() => handleDeleteKit(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Grid>
  ) : (
    <Grid item xs={12}>
      <Typography variant="subtitle2" align="center">
        No Expansions selected
      </Typography>
    </Grid>
  )
}

KitList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  kits: PropTypes.array.isRequired,
  handleDeleteKit: PropTypes.func.isRequired,
}

export default KitList
