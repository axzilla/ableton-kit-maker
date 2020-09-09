import axios from 'axios'

const serverUrl = 'https://api.noize.dev/auth'

export function userLogin(data) {
  return axios.post(`${serverUrl}/login`, data)
}

export function sendActivationEmail(data) {
  return axios.post(`${serverUrl}/send-activation-email`, data)
}
