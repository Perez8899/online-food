import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = ({order, status}) => {

  const getStatusColor = () => {
    switch(status) {
      case 'COMPLETADO':
        return 'success'; 
      case 'PENDIENTE':
        return 'warning'; 
      case 'ENTREGADO':
        return 'info'; 
      default:
        return 'primary'; 
    }
  }

  return (
    <Card className='flex justify-between items-center p-5'>
      <div className='flex items-center space-x-8'>
        <img className='h-16 w-16'
             src={order.food.images[0]} alt="" />
        {/**food details */}
        <div className='ml-4'>
          <p className="font-medium">{order.food.name}</p>                            
          <p className="text-white">₡{order.food.price}</p> 
        </div>    
      </div>
      <div>
        <Button 
          className="cursor-not-allowed" 
          variant="contained"
          color={getStatusColor()}
          sx={{
            textTransform: 'none', 
            fontWeight: 'bold' 
          }}
        >
          {status}
        </Button>
      </div>
    </Card>
  )
}

export default OrderCard