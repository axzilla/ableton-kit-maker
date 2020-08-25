import React from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import { Home as HomeView } from './views'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#FDB442',
    },
    secondary: {
      main: '#555555',
    },
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box mb={10} p={3}>
        <HomeView />
      </Box>
    </MuiThemeProvider>
  )
}

export default App
