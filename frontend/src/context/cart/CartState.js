import React from 'react'


import {CartContext} from "./CartContext";

const CartState=({props})=>{
 return (<CartContext.Provider value={{name:"amir"}}>
    {props}
</CartContext.Provider>
 )
}
export default CartState;