import React from 'react'
import { useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Gowns from './components/Gowns'
import Manager from './components/Manager'
import Login from './components/Login'
import Signup from './components/Signup'
import About from './components/About'
import Models from './components/Models'
import Cart from './components/Cart'
import EventCalendar from './components/EventCalendar'
import Order from './components/Order'
import './App.css'

export const UserContext = createContext()
export const ManagerContext = createContext()
export const CartContext = createContext()
export const FavoritesContext = createContext()
export const DateContext = createContext()

function App() {
  // const [isLoading, setIsLoading] = useState(true)
  const [isManager, setIsManager] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [date, setDate] = useState(user && localStorage.getItem(`date${user.username}`) ? JSON.parse(localStorage.getItem(`date${user.username}`)) : JSON.parse(localStorage.getItem(`date`)))
  const [cart, setCart] = useState(user && localStorage.getItem(`cart${user.username}`) ? JSON.parse(localStorage.getItem(`cart${user.username}`)) :{ qty: 0, items: [] })
  const [favorites, setFavorites] = useState(!user ? [] :
    JSON.parse(localStorage.getItem(`favorites${user.username}`)) ? JSON.parse(localStorage.getItem(`favorites${user.username}`)) :
      [])

  // const [error, setError] = useState(false)

  console.log('date')
  console.log(date)
  console.log('cart')
  console.log(cart)


  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <ManagerContext.Provider value={{ isManager, setIsManager }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <FavoritesContext.Provider value={{ favorites, setFavorites }}>
              <DateContext.Provider value={{ date, setDate }}>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />}>
                      <Route path="cart" element={<Cart />} />
                      <Route path="order" element={<Order />} />
                      <Route path="about" element={<About />} />
                      <Route path="login" element={<Login />} />
                      <Route path="signup" element={<Signup />} />
                      <Route path="manager" element={<Manager />} />
                      <Route path="eventCalendar" element={<EventCalendar />} />
                      <Route path="models">
                        <Route index element={<Models />} />
                        <Route path=":id" element={<Gowns />} />
                      </Route>
                    </Route>
                  </Routes>
                </Router>
              </DateContext.Provider>
            </FavoritesContext.Provider>
          </CartContext.Provider>
        </ManagerContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
