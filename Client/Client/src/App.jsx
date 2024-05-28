import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Gowns from './components/Gowns'
import Manager from './components/Manager'
import Login from './components/Login'
import About from './components/About'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/gowns" element={<Gowns />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
