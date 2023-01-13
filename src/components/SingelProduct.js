import React, { useEffect, useState } from 'react'
import { Link, useParams , useNavigate} from 'react-router-dom'
import Home from '../pages/Home'

const SingelProduct = () => {   
    // baically product discriptions page
    const [product , setProduct] = useState({});
    const params = useParams();
    console.log(params)

    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`https://star-spark-pasta.glitch.me/api/products/${params._id}`)
        .then(res => res.json())
        .then(product =>{
            //console.log(product)
            setProduct(product)
        })
    },[params._id])
    

    
    
  return (
    <>
        <div className='px-12 mt-12'>
            
            <button className='mb-12 font-bold' onClick={()=>{
                navigate(-1);                
            }}>Back</button>
            
            <div className='flex '>
                <img className='w-64' src={product.image}></img>
                <div className='flex flex-col space-between items-start ml-12'>
                    <h1 className='text-2xl font-bold'>{product.name}</h1>
                    <h2 className='mb-3 font-bold'>{product.size}</h2>
                    <h2 className='mb-3 font-bold'>&#8377; {product.price}</h2>
                    <button className='px-4 py-1 bg-orange-500 rounded-full font-semibold'>Add to cart</button>
                </div>                
            </div>
        </div>      
    </>
  )
}

export default SingelProduct
