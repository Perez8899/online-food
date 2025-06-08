import { Height } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const CustomerEventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia sx={{ height: 345 }}
          image='https://png.pngtree.com/thumb_back/fw800/background/20240322/pngtree-all-delicious-fast-food-many-burger-image_15643745.jpg'
        />
        <CardContent>

          <Typography variant='h5'>
            Zaira Comida Rapida
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            50% de Descuento en su Primer Pedido
          </Typography>
          <div className='py-2 space-y-2'>
            <p>{"Santa Rita"}</p>
            <p className='text-sm text-blue-500'>Febrero 14, 2025 10:00 AM </p>
            <p className='text-sm text-red-500'> Febrero 15, 2025 10:00 AM </p>
          </div>

        </CardContent>

        {false && <CardActions>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions> }

      </Card>
    </div>
  )
}

export default CustomerEventCard
