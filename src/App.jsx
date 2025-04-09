import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Home.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './pages/components/PrivateRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
