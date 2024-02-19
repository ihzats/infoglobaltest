import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import HomeAdmin from './Pages/HomeAdmin'
import HomeSuperAdmin from './Pages/HomeSuperAdmin'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/homeadmin' element={<HomeAdmin />} />
        <Route path='/homesuperadmin' element={<HomeSuperAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
