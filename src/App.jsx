import React,{useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage/Login'
import Home from './pages/HomePage/Home'
import Profile from './pages/Profile/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { checkAuth } from './Redux/authSlice'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={ <Login />} />
        <Route path='/dashboard' element={ <ProtectedRoute element={<AdminDashboard/> } allowedRoles={["admin"]}/>  } />
        <Route path='/home' element={<ProtectedRoute element={<Home />} allowedRoles={["user"]}/>  } />
        <Route path='/profile' element={<ProtectedRoute element={<Profile />} allowedRoles={["user"]} />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
