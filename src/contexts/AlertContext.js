import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const AlertContext = createContext()

export function useAlert() {
  return useContext(AlertContext)
}

export function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState('Alert')

  const defaultContext = {
    alert,
    setAlert,
  }

  return <AlertContext.Provider value={defaultContext}>{children}</AlertContext.Provider>
}

AlertContextProvider.propTypes = {
  children: PropTypes.node,
}
