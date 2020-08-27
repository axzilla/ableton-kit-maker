import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import { signInReducer } from '../../slices/authSlice'
import { userLogin, sendActivationEmail } from '../../services/auth'
import setAuthToken from '../../utils/setAuthToken'
import Link from '../../components/Link'
import TextField from '../../components/TextField'
import { Auth as AuthLayout } from '../../layouts'
import { useAlert } from '../../contexts/AlertContext'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
const { shell, ipcRenderer } = window.require('electron')

function SignIn() {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const history = useHistory()
  const [errors, setErrors] = useState('')

  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  })

  function onChange(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const loggedInUser = await userLogin(loginData)
      const jwtToken = loggedInUser.data
      await ipcRenderer.invoke('set-cookie', jwtToken)
      await setAuthToken(jwtToken)
      const decodedUser = jwtDecode(jwtToken)
      dispatch(signInReducer(decodedUser))
      history.push('/')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  async function handleSendActivationEmail() {
    try {
      const response = await sendActivationEmail({ login: loginData.login })
      setAlert({ message: response.data.alertMessage })
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <AuthLayout>
      <Typography variant="h5" align="center" gutterBottom>
        Ready to log in?
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <TextField
            error={errors && errors.login}
            placeholder="Username or email"
            name="login"
            value={loginData.login}
            onChange={onChange}
          />
          {errors.login &&
            errors.login ===
              'Account is not active. Please check your eMail inbox to activate your account or resend activation eMail' && (
              <Box mb={2}>
                <Button
                  fullWidth
                  onClick={handleSendActivationEmail}
                  color="primary"
                  variant="contained"
                >
                  Send activation eMail
                </Button>
              </Box>
            )}
          <TextField
            type="password"
            error={errors && errors.password}
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={onChange}
          />
        </Box>
        <Box mb={2}>
          <Button fullWidth type="submit" color="secondary" variant="contained">
            Login
          </Button>
        </Box>
      </form>
      <Link>
        <Typography
          align="center"
          onClick={() => shell.openExternal('https://www.noize.dev/password-forgot')}
        >
          Forgot password?
        </Typography>
      </Link>
      <Link>
        <Typography
          align="center"
          onClick={() => shell.openExternal('https://www.noize.dev/register')}
        >
          Don’t have an account?
        </Typography>
      </Link>
    </AuthLayout>
  )
}

export default SignIn
