import React from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom'

import UserProfile from './UserProfile'
import Orders from './Orders'
import UsersAddresses from './UsersAddresses'
import Favorite from './Favorite'
import CustomerEvents from './CustomerEvents'
import Notifications from './Notifications'


const Profile = () => {
  return (
    
    // <div className={`flex justify-between ${isSmallScreen ? 'flex-col' : 'lg:flex'}`}>
    // {/* Navigation menu */}
    // {!isSmallScreen && (
    //   <div className="sticky h-[80vh] lg:w-[20%]">
    //     <ProfileNavigation />
    //   </div>
    // )}

    <div className='lg:flex justify-between'>
{/** navigation menu*/}
      <div className='sticky h-[80vh] lg:w-[20%]'>
         <ProfileNavigation/>                       {/*ProfileNavigation.jsx */}
      </div>

{/** navigation routes*/}
{/* <div className={`${isSmallScreen ? 'w-full' : 'lg:w-[80%]'}`}> */}
      <div className='lg:w-[80%]'>
        <Routes>
          <Route path='/' element={<UserProfile/>} />
          <Route path="/ordenes" element={<Orders/>} />
          <Route path="/direccion" element={<UsersAddresses/>} />
          <Route path="/favoritos" element={<Favorite/>} />
           <Route path="/pago" element={<Orders/>} />            {/**no se crea todavia */}
          <Route path="/eventos" element={<CustomerEvents/>} />
          <Route path="/notificacion" element={<Notifications/>} /> {/*no se crea todavia*/ }

        </Routes>
      </div>
    </div>
  )
}

export default Profile
