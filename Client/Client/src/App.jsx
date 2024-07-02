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
export const CartContext = createContext()
export const ManagerContext = createContext()


function App() {
  // const [isLoading, setIsLoading] = useState(true)
  const [isManager, setIsManager] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [cart, setCart] = useState(!user ? { user: null, length: 0, items: [] } : JSON.parse(localStorage.getItem(`cart${user.username}`)) ? JSON.parse(localStorage.getItem(`cart${user.username}`)) : { user: user.username, length: 0, items: [] })
  // const [error, setError] = useState(false)
  // const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})


  return (
    <div className='App'>
      <ManagerContext.Provider value={{ isManager, setIsManager }}>
        <UserContext.Provider value={{ user, setUser }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <Router>
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="cart" element={<Cart />} />
                  <Route path="order" element={<Order />} />
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
                  <Route path="eventCalendar" element={<EventCalendar />} />
                </Route>
              </Routes>
            </Router>
          </CartContext.Provider>
        </UserContext.Provider>
      </ManagerContext.Provider>
    </div>
  )
}

{/* <Route path="posts">
                <Route index element={<Posts />} />
                <Route path=":id" element={<SinglePost />}>
                  <Route path="comments" element={<Comments />} />
                </Route> */}

export default App
