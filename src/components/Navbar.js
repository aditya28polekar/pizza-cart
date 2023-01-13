import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { CartContext } from '../CartContext';

const Navbar = () => {
  const cartStyle = {
    background : "#FFA500",
    display : 'flex', 
    alignItems : 'center', 
    borderRadius : '50px',
    padding : "6px 12px", 
    object_fit: 'contain'   
  }
  const {cart , setCart} = useContext(CartContext)

  return (
    <>
      <nav className="relative container mx-auto flex items-center justify-between py-4 px-10">

        <Link to="/">
          <img style={{
            

          }} className="h-7 md:h-12" src="/images/logo.png" alt="logo"></img>
        </Link>

        <ul className="flex items-center">
          <li><Link className=" text-xs md:text-base md:px-1 mr-1 md:mr-2" to="/">Home</Link></li>
          <li><Link className="text-xs md:text-base md:px-1  mr-1 md:mr-2 " to="/products">Products</Link></li>
          <li className='px-1'>
            <Link to="/cart">
              <div className='flex items-center justify-center bg-orange-400 rounded-full px-3 md:px-3 py-1 md:py-2 '> 
                <span className='text-sm '>{cart.totalItems ? cart.totalItems : 0}</span>
                <img className="ml-1 h-4 md:h-5 "src="/images/cart.png"></img>
              </div>
            </Link>
          </li>
        </ul>


      </nav>
    </>
  )
}

export default Navbar
