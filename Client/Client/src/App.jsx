import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Gowns from './components/Gowns'
import Manager from './components/Manager'
import Login from './components/Login'
import Signup from './components/Signup'
import About from './components/About'
import Models from './components/Models'
import InvitationCalendar from './components/InvitationCalendar'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="manager" element={<Manager />} />
          {/* <Route path="gowns" element={<Gowns />} />
          <Route path="models" element={<Models />} /> */}
          <Route path="models">
            <Route index element={<Models />} />
            <Route path=":id" element={<Gowns />} />
          </Route>
          <Route path="invitationCalendar" element={<InvitationCalendar />} />
        </Route>
      </Routes>
    </Router>
  )
}

{/* <Route path="posts">
                <Route index element={<Posts />} />
                <Route path=":id" element={<SinglePost />}>
                  <Route path="comments" element={<Comments />} />
                </Route> */}

export default App
