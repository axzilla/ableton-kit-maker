import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
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
import BottomNavigation from '@material-ui/core/BottomNavigation'

import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'

const { ipcRenderer } = window.require('electron')

const useStyles = makeStyles({
  bottomNavigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  button: { margin: '10px' },
})

function Home() {
  const classes = useStyles()
  const [kits, setKits] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleGetKits() {
    try {
      setIsLoading(true)
      const expansions = await ipcRenderer.invoke('get-kits')
      const uniqueExpansionPathsArray = [...new Set([...kits, ...expansions])]
      setKits(uniqueExpansionPathsArray)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error) throw error
    }
  }

  function handleDeleteKit(index) {
    setKits([...kits.slice(0, index), ...kits.slice(index + 1)])
  }

  function handleResetKits() {
    setKits([])
  }

  async function handleCreateKits() {
    try {
      await ipcRenderer.invoke('create-kits', kits)
      alert('Kits created successfully')
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Button
          disabled={isLoading}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleGetKits}
        >
          Select Expansion Pack Folder(s)
        </Button>
      </Grid>
      {kits.length > 0 ? (
        <Grid item xs={12}>
          <List dense={true}>
            {kits
              .sort((a, b) => {
                if (a < b) {
                  return -1
                }
                if (a > b) {
                  return 1
                }
                return 0
              })
              .map((kit, index) => {
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
                      <IconButton onClick={() => handleDeleteKit(index)}>
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
      )}
      <BottomNavigation showLabels className={classes.bottomNavigation}>
        <Button
          disabled={kits.length < 1}
          onClick={handleResetKits}
          variant="outlined"
          className={classes.button}
          color="primary"
        >
          Reset
        </Button>
        <Button
          disabled={kits.length < 1}
          onClick={handleCreateKits}
          variant="outlined"
          className={classes.button}
          color="secondary"
        >
          Create Kits
        </Button>
      </BottomNavigation>
    </Grid>
  )
}

export default Home
