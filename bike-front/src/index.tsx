import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextProvider } from './hooks/useStateContex'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>
)
