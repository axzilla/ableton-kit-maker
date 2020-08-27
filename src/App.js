import React, { useEffect } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/PrivateRoute'
import Alert from './components/Alert'
import { Home as HomeView } from './views'
import { SignIn as SignInView } from './views'
import { AlertContextProvider } from './contexts/AlertContext'

const { ipcRenderer } = window.require('electron')

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
  const history = useHistory()
  // const [isOnline, setNetwork] = useState(window.navigator.onLine)

  useEffect(() => {
    getInitialAuth()

    // window.addEventListener('offline', updateNetwork)
    // window.addEventListener('online', updateNetwork)
    // return () => {
    //   window.removeEventListener('offline', updateNetwork)
    //   window.removeEventListener('online', updateNetwork)
    // }
  }, [])

  // function updateNetwork() {
  //   setNetwork(window.navigator.onLine)
  // }

  async function getInitialAuth() {
    const jwtToken = await ipcRenderer.invoke('get-cookie')
    setAuthToken(jwtToken)

    if (jwtToken) {
      const decodedUser = jwtDecode(jwtToken)
      const currentTime = Date.now() / 1000
      if (decodedUser.exp > currentTime) {
        history.push('/signin')
      }
    }
  }

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
