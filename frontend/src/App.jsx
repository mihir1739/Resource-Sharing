import React, { useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Create from './components/Create';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home isLoggedIn={isLoggedIn} />} />
          <Route exact path='/create' element={<Create isLoggedIn={isLoggedIn}/>}/>
          <Route exact path='/login' element={<Login setIsLoggedIn={ setIsLoggedIn }/>} />
          {/* <Route exact path='/signup' element={<Signup />} /> */}
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
