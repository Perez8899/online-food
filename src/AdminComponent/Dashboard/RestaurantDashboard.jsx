import { Grid } from '@mui/material'
import React from 'react'
import MenuTable from "../Menu/MenuTable"
import Orders from '../Orders/Orders'
import Menu from "../Menu/Menu"

const RestaurantDashboard = () => {
  return (
    <div className="px-2">
      <Grid container spacing={3}>
        <Grid item size={12} lg={6}>
          <Orders name={"Orden Reciente"} isDashboard={true}/>
        </Grid>
        <Grid item size={12} lg={6}>
          <Menu isDashboard={true} name={"Menu Reciente Agregado"}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default RestaurantDashboard
