import React, { useState, useSyncExternalStore } from 'react'
import './Signup.css'
import { API_URL } from '../../utils/constants';
import SuccessCard from '../SuccessCard/SuccessCard';
import { ToastContainer, toast } from 'react-toastify';


const SignupForm = ({ setAccessMethord }) => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [verification, setVerificatoin] = useState({})
  const [dataSubmission, setDataSubmission] = useState(false)

  const validate = () => {

    const verify = {};
    const { email, password, name } = signupData

    if (email.trim().length < 5) {
      verify.email = "Email must be at least 5 characters";
    }
    if (password.trim().length < 5) {
      verify.password = "Password must be at least 5 characters";
    }
    if (name.trim().length < 5) {
      verify.name = "Enter a valid name";
    }

    setVerificatoin(verify);

    return Object.keys(verify).length === 0
  }

  const submit = async () => {
    const valid = validate()

    if (valid) {
      setLoading(true)
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setDataSubmission(true)
      }else{
        toast.error(data.message)
      }

      setLoading(false)
    }

  }

  return (
    <div className='loginform'>
      {
        dataSubmission ? <SuccessCard setAccessMethord={setAccessMethord}/> : (<>
      
      <h3 className='pb-3 heading'>Register</h3>
      <form >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
          <input autoFocus type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
          {
            verification.name && <small className='text-danger'> {verification.name}</small>
          }
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          {
            verification.email && <small className='text-danger'> {verification.email}</small>
          }
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
          {
            verification.password && <small className='text-danger'> {verification.password}</small>
          }
        </div>

        <button type="button" onClick={submit} className="btn btn-primary w-100">
          {
            !loading ? 'Submit' :
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          }
        </button>
        <div id="emailHelp" className="form-text text-dark mt-2">Already registred? <span className='text-primary accountCreationLink ml-2' onClick={() => setAccessMethord('login')}>Login </span></div>
      </form>

      </>)
      }
    </div>

  )
}

export default SignupForm
