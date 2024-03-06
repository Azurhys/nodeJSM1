import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter , Routes , Route } from "react-router-dom"
import Home from './composants/Accueil';
import ListeSports from './composants/ListeSports';
import ListeMedailles from './composants/ListeMedailles'
import Map from './composants/Map'
import Login from './composants/Login';
import { AuthProvider } from './context/authContext';
import Dashboard from './composants/Dashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='/listesports' element={<ListeSports />} />
            <Route path='/listemedailles' element={<ListeMedailles />} />
            <Route path='/map' element={<Map />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
)
