import React from 'react'
import './Profile.css'
import Navbar from '../../components/Nanbar/Navbar'
import ProfileCards from '../../components/ProfileCards/ProfileCards'

const Profile = () => {

  return (
    <div className='page'>
      <div className='glass_card'>
        <Navbar />
      </div>

      <div className='container heading mt-3 glass_card d-flex'>
        <i className="bi bi-person-lines-fill icon"></i>
        <h2 className='text-dark'>Profile</h2>
      </div>

      <ProfileCards />
    </div>
  )
}

export default Profile
