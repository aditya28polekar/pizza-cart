import React, { useContext, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { CartContext } from '../CartContext';
  
const Product = (props) => {
    const [isAdding , setIsAdding] = useState(false)
    const {cart , setCart} = useContext(CartContext)
    const {product} = props    
    function addToCart(e , product){
        e.preventDefault()
        console.log(product );

        // schema for cart
        // const cart = {
        //     items: {
        //         '60c67bc0f5ee510015f3dda7' : 2, // quanitity
        //         '60c67bc0f5ee510015f3wdh7' : 3
        //     },
        //     totalItems: 5
        // }

        let _cart = {...cart} //{}
        if(!_cart.items){
            _cart.items = {}
        }
        if(_cart.items[product._id]){
            _cart.items[product._id] += 1;
        }
        else{
            _cart.items[product._id] = 1;
        }
        
        if(!_cart.totalItems){
            _cart.totalItems = 0;
        }
        _cart.totalItems += 1;
        setCart(_cart)
        
        
        setIsAdding(true)
        setTimeout(()=>{
            setIsAdding(false)
        } , 1000)
        
        
    }
    return (
        <>
            <Link to={`/products/${product._id}`}> 
                <div className='m-6 bg-slate-50 rounded'>
                    <div className=' px-4 py-2'>
                        <img className="object-contain" src={product.image}></img>
                        <h2 className='text-1xl font-bold text-center mb-1'>{product.name}</h2>
                        <div className='flex justify-center'>
                            <button className=' px-2 py-1 bg-zinc-300 rounded-full mb-5'>{product.size}</button>
                        </div>
                        <div className='flex justify-between items-center'>
                            <h3 className='font-bold'>&#8377; {product.price}</h3>
                            <button disabled={isAdding == true} onClick={(e)=>{addToCart(e , product)}} className= {`${isAdding ? 'bg-green-500' : 'bg-orange-500' } px-4 py-1  rounded-full font-semibold`}>Add{isAdding ? 'ed' : ''}</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Product
