import React, { useEffect } from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

const Favorities = () => {

  const {auth} = useSelector(store => store);

  useEffect(()=>{
  },[])

  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>Restaurantes Favoritos</h1>
      <div className='flex flex-wrap gap-3 justify-center'>
        {auth.favorities.map((item)=> <RestaurantCard data={item}/>)}
      </div>
          
    </div>
  )
}

export default Favorities
