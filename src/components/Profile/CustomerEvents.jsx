import React from 'react'
import CustomerEventCard from './CustomerEventCard'

const CustomerEvents = () => {
  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {[1,1,1].map((item) => <CustomerEventCard/>)}
    </div>
  )
}

export default CustomerEvents
