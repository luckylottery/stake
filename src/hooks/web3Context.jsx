import React, { useState } from 'react'

const Web3Context = React.createContext({ web3Val: null, setValue: (val) => null })

const Web3ContextProvider = ({ children }) => {
  const [web3Val, setWeb3Val] = useState(null)

  const setValue = (val) => {
    setWeb3Val(val)
  }

  return (
    <Web3Context.Provider value={{ web3Val, setValue }}>
      {children}
    </Web3Context.Provider>
  )
}

export { Web3Context, Web3ContextProvider }