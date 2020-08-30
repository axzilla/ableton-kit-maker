import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import { signInReducer } from './slices/authSlice'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/PrivateRoute'
import Alert from './components/Alert'
import { Home as HomeView } from './views'
import { SignIn as SignInView } from './views'
import { AlertContextProvider } from './contexts/AlertContext'

const Store = window.require('electron-store')

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
  const dispatch = useDispatch()

  useEffect(() => {
    async function getInitialAuth() {
      const store = new Store()
      const jwtToken = store.get('jwtToken')

      if (jwtToken) {
        setAuthToken(jwtToken)
        const decodedUser = jwtDecode(jwtToken)
        await dispatch(signInReducer(decodedUser))

        // check if user still exist, otherwise push to login
      }
    }

    getInitialAuth()

    // window.addEventListener('offline', updateNetwork)
    // window.addEventListener('online', updateNetwork)
    // return () => {
    //   window.removeEventListener('offline', updateNetwork)
    //   window.removeEventListener('online', updateNetwork)
    // }
  }, [dispatch])

  // function updateNetwork() {
  //   setNetwork(window.navigator.onLine)
  // }

  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <AlertContextProvider>
          <CssBaseline />
          <Box mb={10} p={3}>
            <Switch>
              <PrivateRoute path="/" component={HomeView} exact />
              <Route path="/signin" component={SignInView} exact />
            </Switch>
          </Box>
          <Alert />
        </AlertContextProvider>
      </MuiThemeProvider>
    </HashRouter>
  )
}

export default App
