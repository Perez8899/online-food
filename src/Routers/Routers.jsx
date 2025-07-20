import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouters from './AdminRouters'
import CustomerRouter from "./CustomerRouter"
const Routers = () => {
  return (
    <div>
      <Routes>

        <Route
        path="/admin/restaurants/*"
        element={<AdminRouters/>}
      />
      
      <Route path="/*" element={<CustomerRouter/>} />
      </Routes>

    </div>
  )
}

export default Routers
