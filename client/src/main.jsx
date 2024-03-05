import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter , Routes , Route } from "react-router-dom"
import Home from './composants/Accueil';
import ListeSports from './composants/ListeSports';
import ListeMedailles from './composants/ListeMedailles'
import Map from './composants/Map'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/listesports' element={<ListeSports />} />
          <Route path='/listemedailles' element={<ListeMedailles />} />
          <Route path='/map' element={<Map />} />
        </Route>
      </Routes>
  </BrowserRouter>
)
