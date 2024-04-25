import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/main.css'
import { AuthContextProvider } from './context/AUthenticationContext'
import { ChatContextProvider } from './context/ChatContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </ChatContextProvider>
  </AuthContextProvider>
)
