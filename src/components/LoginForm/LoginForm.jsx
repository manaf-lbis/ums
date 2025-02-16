import React, { useState,useEffect } from 'react'
import './LoginForm.css'
import { API_URL } from '../../utils/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { updateAuth } from '../../Redux/authSlice';


const LoginForm = ({ setAccessMethord }) => {
  const navigate = useNavigate()
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      if (auth.role === 'admin') {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
      window.history.replaceState(null, "", "/home"); 
    }
  }, [auth, navigate]);

  const [logindata, setLogindata] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false)
  const [verification, setVerificatoin] = useState({})

  const dispatch = useDispatch()

  const validate = () => {
    const verify = {};
    const { email, password } = logindata

    if (email.trim().length < 5) {
      verify.email = "Email must be at least 5 characters";
    }
    if (password.trim().length < 5) {
      verify.password = "Password must be at least 5 characters";
    }

    setVerificatoin(verify)
    return Object.keys(verify).length === 0
  }

  const submit = async () => {
    const valid = validate()
    if (valid) {
      setLoading(true)
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logindata)
      })

      const data = await response.json()

      console.log('data',data);

      if(response.ok ){
        toast.success(data.message)
        dispatch(updateAuth(data.user)); 
        
        if(data.user.role==='admin'){
          navigate("/dashboard", { replace: true });
        }else{
          navigate("/home", { replace: true });
        }
        
      }else{
        toast.error(data.message)
      }
      setLoading(false)
    }
  }

  return (
    <div className='loginform'>
      <h3 className='pb-3 heading'>Login</h3>
      <form >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoFocus onChange={(e) => setLogindata({ ...logindata, email: e.target.value })} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          {
            verification.email && <small className='text-danger'> {verification.email}</small>
          }
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={logindata.password} onChange={(e) => setLogindata({ ...logindata, password: e.target.value })} />
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

        <div id="emailHelp" className="form-text text-dark mt-2">Not registred?
          <span className='text-primary accountCreationLink' onClick={() => setAccessMethord('Signup')}> Create account </span>
        </div>
      </form>


    </div>
  )
}

export default LoginForm
