// Packages
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Global Components
import ToolBar from '../../components/ToolBar'

// Local Components
import {
  CopySamplesCard,
  DialogSuccess,
  LibraryCard,
  SelectExpansionsCard,
  KitList,
  BottomBar,
} from './components'

// Slices
import { getKitList } from '../../slices/kitListSlice'
import { deleteKitList } from '../../slices/kitListSlice'
import { resetKitList } from '../../slices/kitListSlice'
import { setIsLoading } from '../../slices/isLoadingSlice'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

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
}))

function Home() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [userLib, setUserLib] = useState('')
  const [copyAudioFiles, setCopyAudioFiles] = useState(false)
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
      await ipcRenderer.invoke('create-kits', { kits, copyAudioFiles })
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
          <CopySamplesCard
            isLoading={isLoading}
            copyAudioFiles={copyAudioFiles}
            setCopyAudioFiles={setCopyAudioFiles}
          />
        </Grid>
        <Grid item xs={12}>
          <LibraryCard
            isLoading={isLoading}
            handleBrowseUserLibrary={handleBrowseUserLibrary}
            userLib={userLib}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectExpansionsCard isLoading={isLoading} handleGetKits={handleGetKits} />
        </Grid>
        <KitList kits={kits} isLoading={isLoading} handleDeleteKit={handleDeleteKit} />
        <BottomBar
          kits={kits}
          isLoading={isLoading}
          handleCreateKits={handleCreateKits}
          handleResetKits={handleResetKits}
        />
        <DialogSuccess open={open} handleClose={handleClose} />
      </Grid>
    </>
  )
}

export default Home
