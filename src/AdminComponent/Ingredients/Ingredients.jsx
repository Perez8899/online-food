import { Grid } from '@mui/material'
import React from 'react'
import IngredientTable from './IngredientTable'
import IngredientCategoryTable from './IngredientCategoryTable'

const Ingredients = () => {
  return ( 
                  // space PX-2
    <div className='px-2'>   
      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <IngredientTable/>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <IngredientCategoryTable/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Ingredients
