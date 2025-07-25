import React from 'react'
import { topMeels } from './topMeels'

//consuming props from the image and title properties
const CarouselItem = ({image, title }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
            <img className='w-[10rem] h-[10rem] lg:w-[14rem] lg:h-[14rem] rounded-full object-cover object-center' src={image} alt={title} />
            <span className='py-5 font-semibold text-xl text-white'>{title}</span>
        </div>
  )
}

export default CarouselItem
