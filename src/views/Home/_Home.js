// Packages
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import ToolBar from '../../components/ToolBar'

// Slices
import { getKitList } from '../../slices/kitListSlice'
import { deleteKitList } from '../../slices/kitListSlice'
import { resetKitList } from '../../slices/kitListSlice'
import { setIsLoading } from '../../slices/isLoadingSlice'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinearProgress from '@material-ui/core/LinearProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
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
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'

// Electron
const { ipcRenderer } = window.require('electron')

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  bottomNavigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  button: { margin: '10px' },
}))

function Home() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [userLib, setUserLib] = useState('')
  const { kits } = useSelector(state => state.kitList)
  const { isLoading } = useSelector(state => state.isLoading)
  const classes = useStyles()

  useEffect(() => {
    getAbletonUserLibraryPath()
    ipcRenderer.invoke('handle-analytics', '/')
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function getAbletonUserLibraryPath() {
    const data = await ipcRenderer.invoke('get-user-lib')
    setUserLib(data)
  }

  async function handleGetKits() {
    try {
      dispatch(setIsLoading(true))
      const expansions = await ipcRenderer.invoke('get-kits')
      const uniqueExpansionPathsArray = [...new Set([...kits, ...expansions])]
      dispatch(getKitList(uniqueExpansionPathsArray))
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
      if (error) throw error
    }
  }

  function handleDeleteKit(index) {
    dispatch(deleteKitList([...kits.slice(0, index), ...kits.slice(index + 1)]))
  }

  function handleResetKits() {
    dispatch(resetKitList())
  }

  async function handleCreateKits() {
    try {
      dispatch(setIsLoading(true))
      await ipcRenderer.invoke('create-kits', kits)
      handleClickOpen()
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
      if (error) throw error
    }
  }

  async function handleBrowseUserLibrary() {
    dispatch(setIsLoading(true))
    const data = await ipcRenderer.invoke('browse-user-library')
    setUserLib(data)
    dispatch(setIsLoading(false))
  }

  return (
    <>
      <ToolBar />
      <div className={classes.toolbar} />
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
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
            ></CardHeader>
          </Card>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        {kits.length > 0 ? (
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
        )}
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          {isLoading && <LinearProgress />}
          <Toolbar>
            <Grid container justify="center">
              <Button
                disabled={kits.length < 1 || isLoading}
                onClick={handleResetKits}
                variant="contained"
                className={classes.button}
                color="secondary"
              >
                Reset
              </Button>
              <Button
                disabled={kits.length < 1 || isLoading}
                onClick={handleCreateKits}
                variant="contained"
                className={classes.button}
                color="primary"
              >
                Create Kits
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Kits created successfully'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You can find your Kits in Ableton under: <br />
              Presets &gt; Instruments &gt; Drum Rack &gt; Ableton Kit Maker.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}

export default Home
