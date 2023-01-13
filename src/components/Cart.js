import React, { useContext, useEffect, useState } from 'react'
import { json } from 'react-router-dom'
import { CartContext } from '../CartContext'
import Product from './Product'



const Cart = () => {
  let total = 0;
  const [products, setProducts] = useState([])
  const { cart , setCart } = useContext(CartContext)
  const [priceFetched , TogglePriceFetched] = useState(false);

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    if(priceFetched){
      return;
    }
    fetch('https://star-spark-pasta.glitch.me/api/products/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ids: Object.keys(cart.items)
      })
    }).then(res => res.json())
      .then(products => {
        TogglePriceFetched(true)
        setProducts(products)
      })


  }, [cart])

  const getQty = (productId)=>{
    return cart.items[productId];    
  }

  const increment = (productId) =>{
    const oldQty = cart.items[productId];
    const _cart = {...cart}
    const newQty = oldQty + 1; 
    _cart.items[productId] = newQty;
    _cart.totalItems += 1;
    setCart(_cart);
  }

  const decrement = (productId) =>{    
    const oldQty = cart.items[productId];
    if(oldQty == 1){
      return;
    }
    const _cart = {...cart}
    const newQty = oldQty - 1; 
    _cart.items[productId] = newQty;
    _cart.totalItems -= 1;
    setCart(_cart);
  }

  const getSum = (productId , price)=>{
    const qty = cart.items[productId];    
    total += price*qty;
    return price*qty;
  }

  const handelDelete = (productId)=>{
    const _cart = {...cart}
    const qty = _cart.items[productId];
    delete _cart.items[productId]
    _cart.totalItems -= qty;
    setCart(_cart)

    setProducts(products.filter((product)=>{
      return product._id !== productId    
    }))
  }

  const handelOrderNow = ()=>{
    window.alert('OrderPlaed Sucessfully');
    setProducts([]);
    setCart({})
  }

  return (
    products.length ? 
    <div className='container mx-auto lg:w-1/2 w-full'>
      <h1 className='my-12 font-bold'>Cart Items</h1>

      <ul>

        {
          products.map((product) => {            
            return (              
              <li className='mb-10' key={product._id}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img className='h-8 md:h-16' src={product.image}></img>
                    <span className='font-bold text-sm md:text-base ml-2 md:ml-4 w-18 md:w-48'>{product.name}</span>
                  </div>
                  <div>
                    <button onClick={()=>{decrement(product._id)}} className='bg-yellow-500 px-1 md:px-4 py-1 rounded-full'>-</button>
                    <b className='px-1 md:px-2 text-xs md:text-base'>{getQty(product._id)}</b>
                    <button onClick={()=>{increment(product._id)}} className='bg-yellow-500 px-1 md:px-4 py-1 rounded-full'>+</button>
                  </div>
                  <span className='font-bold text-sm md:text-base'>&#8377; {getSum(product._id , product.price)}</span>
                  <button onClick={()=>{handelDelete(product._id)}} className='bg-red-500 px-2 md:px-4 py-1 rounded-full text-white mx-1'>Delete</button>
                </div>
              </li>
            )
          })
        }
        
      </ul>

      <hr className='my-6'></hr>
      <div className='text-right mb-2 mr-2'>
        <b>Grand Total: &#8377;</b> {total}
      </div>
      <div className='flex justify-end mb-20 mr-3'>
        <button onClick={()=>{handelOrderNow()}} className='bg-orange-400 px-4 py-1 rounded-full '>OrderNow</button>
      </div>



    </div> 
    : 
    <img className="mx-auto w-1/2 mt-12" src="./images/empty-cart.png" ></img> 
  )
}

export default Cart
