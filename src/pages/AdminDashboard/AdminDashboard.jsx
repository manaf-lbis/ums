import React from 'react'
import Navbar from '../../components/Nanbar/Navbar'
import './AdminDashboard.css'
import Dash from '../../components/AdminDashboard/AdminDashboard'

const AdminDashboard = () => {
  return (
    <div className='admindashboard'>
       <Navbar />
       <Dash />

    </div>
   
  )
}

export default AdminDashboard
