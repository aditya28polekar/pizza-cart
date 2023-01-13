import React, { useEffect, useState ,useContext} from 'react'
import { CartContext } from '../CartContext';
import Product from './Product'


const Products = () => {
  //const {name} = useContext(CartContext)
  const [products , setProducts] = useState([])
  useEffect(()=>{
    fetch('https://star-spark-pasta.glitch.me/api/products')
    .then(res =>res.json())
    .then(products =>{
      setProducts(products)      
    })
  } , []);
  
  return (
    <div className='container mx-auto mb-80 mt-10'>
      <h2 className='text-2xl font-bold px-8'>Products</h2>
      <div div className='grid grid-cols-2 gap-1  md:grid-cols-3 gap-4 lg:grid-cols-5 gap-4'>
        {
          products.map((product)=> <Product key={product._id} product={product}/>)
        }      
        
      </div>

    </div>

  )
}

export default Products
