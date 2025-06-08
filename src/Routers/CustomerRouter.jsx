import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import Cart from '../components/Cart/Cart'
import RestaurantDetails from '../components/Restaurant/RestaurantDetails'
import Profile from '../components/Profile/Profile'
import Auth from '../components/Auth/Auth'

const CustomerRouter = () => {
  return (
    <div className='relative'>
      <nav className='sticky top-0 z-50'>
        <Navbar />
      </nav>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/account/:register' element={<Home />} />
        <Route exact path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile />} />
      </Routes>
      <Auth/>
    </div>
  )
}

export default CustomerRouter
