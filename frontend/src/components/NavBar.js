import React from 'react'
import navlogo from '../assets/img/Ekart.png'
import searchlogo from '../assets/img/searchlogo2.png'
import login from '../assets/img/login.png'
import signup from '../assets/img/signup.png'
const NavBar = () => {
  return (
    <div>
      <div className="navbar w-screen h-24 flex border-2 border-[#ff7f00]">
      <div className='w-[20%] h-full items-center flex'>
        <img src={navlogo} className='h-full' alt="logo" />
         <div className='w-[80%] flex items-center mx-3'>
        <input type="text" className='w-[80%] border-2 border-[#ff7f00]  h-10 rounded-xl rounded-r-none' name="" id="" placeholder='Search'  />
         <img className='h-10 rounded-xl rounded-l-none border-[#ff7f00] border-2 ' src={searchlogo} alt="searchlogo" />
         </div>
      </div>
      <div className='w-[60%] h-full  items-center flex '>
        <ul className='flex justify-between w-full mx-3 text-[#ff7f00]  text-3xl'>
         
          <li>Home</li>
          <li>product</li>
          <li>order</li>
          <li>cart</li>
          
        </ul>
      </div>
      <div className='w-[20%] h-full  flex items-center justify-center '>
        <div className='login h-full w-1/2 flex justify-center items-center'>
          <div>

           <img className='h-14 ' src={login} alt="loginImg" />
           <h5 className=' px-2 text-[#ff7f00]'>login</h5>
          </div>
        </div>
        <div className='login h-full w-1/2  flex justify-center items-center'>
          <div>

           <img className='h-14 ' src={signup} alt="loginImg" />
           <h5 className=' text-[#ff7f00] '>Signup</h5>
          </div>
        </div>
        
      </div>
                 
        </div>
    </div>
  )
}

export default NavBar