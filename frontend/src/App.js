import React from 'react'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import CartState from './context/cart/CartState'


const App = () => {
  return (
    <>
    
  <CartState>

    <NavBar/>
    <HomePage/>
    
  </CartState>
    </>

    
  )
}

export default App