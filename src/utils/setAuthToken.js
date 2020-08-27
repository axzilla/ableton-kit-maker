import axios from 'axios'

function setAuthToken(jwtToken) {
  if (jwtToken) {
    axios.defaults.headers.common['Authorization'] = jwtToken
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
