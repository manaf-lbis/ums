import React from 'react';
import Lottie from 'lottie-react';
import './SuccessCard.css';
import successAnimation from '../../assets/js/successAnimation.json'
import SuccessCard1 from '../SuccessCard1/SuccessCard1';


const SuccessCard = ({setAccessMethord}) => {
  return (

    <div className='d-flex justify-content-center align-items-center flex-column'>
      <Lottie 
        animationData={successAnimation} 
        autoplay 
        style={{ width: '200px', height: '200px' }}
      />
      <h5 className='text-success'>Registration Successful !!!</h5>
      <h5 className='text-success'>You can log in after approval</h5>
      <button onClick={() => setAccessMethord('login')} className='btn btn-primary mt-2'>
        Continue to Login
      </button>
    </div>
  );
};

export default SuccessCard;
