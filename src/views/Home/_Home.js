import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'

const { ipcRenderer } = window.require('electron')

function Home() {
  const [extensionPaths, setExtensionPaths] = useState([])

  async function handleGetExtensions() {
    try {
      const extensions = await ipcRenderer.invoke('get-extensions')
      const uniqueExtensioPathsArray = [...new Set([...extensionPaths, ...extensions])]
      setExtensionPaths(uniqueExtensioPathsArray)
    } catch (error) {
      if (error) throw error
    }
  }

  function getExtensionName(extensionPath) {
    return extensionPath.slice(extensionPath.lastIndexOf('/') + 1)
  }

  function handleDeleteExtension(index) {
    setExtensionPaths([...extensionPaths.slice(0, index), ...extensionPaths.slice(index + 1)])
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Button fullWidth variant="contained" color="secondary" onClick={handleGetExtensions}>
          Select Expansion Pack Folder(s)
        </Button>
      </Grid>
      {extensionPaths.length > 0 ? (
        <Grid item xs={12}>
          <List dense={true}>
            {extensionPaths
              .sort((a, b) => {
                if (a < b) {
                  return -1
                }
                if (a > b) {
                  return 1
                }
                return 0
              })
              .map((extensionPath, index) => {
                return (
                  <ListItem key={extensionPath} button>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Kit: ${getExtensionName(extensionPath)}`}
                      secondary={'Extension'}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleDeleteExtension(index)}>
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
            No Extensions selected
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default Home
