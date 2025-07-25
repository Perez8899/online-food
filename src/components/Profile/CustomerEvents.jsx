import React, { useEffect } from 'react'
import CustomerEventCard from './CustomerEventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../State/Restaurant/Action'
import EventCard from '../../AdminComponent/Events/EventCard'

const CustomerEvents = () => {
   const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
 
  const {restaurant,auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getAllEvents({jwt}))
  },[auth.jwt])

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {restaurant.events.map((item) => <div>
                  {/* //is CUSTOMER */}
        <EventCard isCustomer={true} item={item}/> 
        </div>)}

      {/* //{[1,1,1].map((item) => <CustomerEventCard/>)} */}

    </div>
  )
}

export default CustomerEvents
