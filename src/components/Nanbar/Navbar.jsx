import React, { useEffect } from 'react'
import logo from '../../../public/logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../../Redux/userSlice'
import { logout } from '../../Redux/authSlice'
import { API_URL } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

      const dispatch = useDispatch();
      const navigate = useNavigate()
      useEffect(() => {
            dispatch(fetchUserData())
      }, [dispatch ])

      const userInfo = useSelector((store) => store.userInfo);
      const { name } = userInfo?.user || {}

      const handleLogout = async () => {
            dispatch(logout())
            const response = await fetch(API_URL + '/logout', {
                  credentials: 'include'
            })
            if (response.ok) {
                  navigate("/");
            }
      }

      return (
            <nav className='navbar'>

                  <Link to={'/home'} className='logo glass text-decoration-none'>
                        <img src={logo} alt="" />
                        <span > User Management</span>
                  </Link>

                  <div className='nav_sec main glass'>

                        <div className='nav_icon'>
                              <i className="bi bi-house-fill text-primary"></i>
                              <span >Home</span>
                        </div>

                        <div className='nav_icon'>
                              <i className="bi bi-list-task"></i>
                              <span >Task</span>
                        </div>

                  </div>

                  <div className='profile_sec glass nav_sec'>

                        <div className="icon nav_icon">
                              {
                                    false ?
                                          <img src="" alt="" /> :
                                          <i className="bi bi-person-circle text-primary"></i>
                              }
                              <span >{name || 'User name'}</span>
                        </div>

                        <div className="settings nav_icon">
                              <i className="bi bi-gear drop_down">
                                    <ul className='menu galss_card'>
                                          <li onClick={() => handleLogout()}>

                                                <i className="bi bi-box-arrow-left" ></i>Logout

                                          </li>
                                    </ul>
                              </i>

                        </div>

                  </div>
            </nav>
      )
}

export default Navbar
