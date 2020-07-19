import React, { useState } from 'react'

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

const { ipcRenderer } = window.require('electron')

function Home() {
  const [extensionPaths, setExtensionPaths] = useState([])

  function getExtensionName(extensionPath) {
    return extensionPath.slice(extensionPath.lastIndexOf('/') + 1)
  }

  function isDoubleEntrie(extensions) {
    return extensionPaths.some((item) => extensions.includes(item))
  }

  async function handleGetExtensions() {
    try {
      const extensions = await ipcRenderer.invoke('get-extensions')

      if (!isDoubleEntrie(extensions)) {
        setExtensionPaths([...extensionPaths, ...extensions])
      }
    } catch (error) {
      if (error) throw error
    }
  }

  function handleDeleteExtension(index) {
    setExtensionPaths([
      ...extensionPaths.slice(0, index),
      ...extensionPaths.slice(index + 1),
    ])
  }

  return (
    <Grid style={{ background: 'green' }} onDr>
      <Typography>Drag & Drop</Typography>
      <Typography>or</Typography>
      <Typography onClick={handleGetExtensions}>
        Select Expansion Pack Folder(s)
      </Typography>
      {extensionPaths && (
        <Grid item xs={12} md={6}>
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
                  <>
                    <ListItem>
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
                        <IconButton
                          onClick={() => handleDeleteExtension(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </>
                )
              })}
          </List>
        </Grid>
      )}
    </Grid>
  )
}

export default Home
