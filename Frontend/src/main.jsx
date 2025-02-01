import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/NavBar.jsx'
import App from './App.jsx'
import MlaList from './Components/MlaList.jsx'
import MlaDetails from './Components/MlaDetails.jsx'
import { Provider } from 'react-redux'
import Store from './Redux/Store.js'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <Navbar />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/mlalist' element={<MlaList />} />
          <Route path='/mladetails/:Name' element={<MlaDetails />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
