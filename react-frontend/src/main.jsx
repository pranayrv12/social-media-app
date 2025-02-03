import './index.css'
import App from './App'
import React from 'react'
import { store } from './Store/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
const clientId =
    '967321813620-oeso1spo90v89gj3o1ah7580tt1coqp6.apps.googleusercontent.com'

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <GoogleOAuthProvider clientId={clientId}>
                    <App></App>
                </GoogleOAuthProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
