import './App.css';
//import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home.js'
import About from './pages/About.js'
import Navbar from './components/Navbar.js'
import Products from './components/Products';
import Cart from './components/Cart';
import SingelProduct from './components/SingelProduct';
import { CartContext } from './CartContext';
import { useEffect, useState } from 'react';

// to get cart data from local storage
const getLocalCartItems = () =>{
  let cart_data = localStorage.getItem('cart')
  if(cart_data){
    return JSON.parse(localStorage.getItem('cart'));
  }
  else{
    return {};
  }
}
function App() {
  const [cart , setCart] = useState(getLocalCartItems())  
  // fetch the cart from local storage
  useEffect(()=>{
    const cart = localStorage.getItem('cart');
    setCart(JSON.parse(cart));    
  },[])
  
  useEffect(()=>{
    window.localStorage.setItem('cart' , JSON.stringify(cart));

  },[cart])



  return (
    <>

      <Router>
        <CartContext.Provider value={{cart , setCart}}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/products/:_id" element={<SingelProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
