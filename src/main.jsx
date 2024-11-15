import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from '~/untils/ScrollToTopComponent/ScrollToTop'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import theme from './theme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CssVarsProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <ScrollToTop />
        <App />
        <ToastContainer position="bottom-left" icon={false} theme="dark" />
      </Provider>
    </CssVarsProvider>
  </BrowserRouter>
)