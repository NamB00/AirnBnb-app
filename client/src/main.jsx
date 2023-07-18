import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {
  BrowserRouter
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from './context/UserContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
)
