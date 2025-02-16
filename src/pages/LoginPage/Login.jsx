import React, { useState } from 'react'
import './Login.css'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignupForm from '../../components/SignupForm/SignupForm'


const Login = () => {
  const [accessMethod , setAccessMethord ] = useState('login')
  
  return (
    <div className='login_page'>
      {
        accessMethod === 'login' ?
         <LoginForm setAccessMethord={setAccessMethord} /> : 
        <SignupForm setAccessMethord={setAccessMethord} />
      }
    </div>
  )
}

export default Login
