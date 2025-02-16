import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const SuccessCard1 = ({message}) => {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
      <DotLottieReact
        src="../../../public/success1.lottie"
        autoplay
        style={{ width: '200px', height: '200px' }}
      />
      <h5 className='text-success mt-2'>{message}</h5>
    </div>
  )
}

export default SuccessCard1
