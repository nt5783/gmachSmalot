import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './flags.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
