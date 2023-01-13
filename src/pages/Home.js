import React from 'react'
import Products from '../components/Products';

const Home = () => {
  return (
    <>
      <div className="container mx-auto flex items-center pl-20 py-16">
        <div className="w-1/2">
          <h3 className='text-1xl'>Are you hungry ?</h3>
          <h1 className='text-4xl font-bold'>Don't Wait !</h1>
          <button className='text-white font-bold bg-orange-300 rounded-full px-2 py-1 my-2'>Order Now</button>
        </div>
        <div className="flex justify-center items-center w-1/2 mr-12">
          <img className='w-4/5 object-contain' src="/images/pizza.png"></img>
        </div>
      </div>
      <Products/>
    </>
  )
}

export default Home;
