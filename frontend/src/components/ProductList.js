import React, { useContext } from 'react'
import { CartContext } from '../context/cart/CartContext'

const ProductList = () => {
    const context=useContext(CartContext)
  return (
    <div>ProductList :{context.name}</div>
  )
}

export default ProductList