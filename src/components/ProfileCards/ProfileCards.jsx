import React, { useEffect, useState } from 'react'
import './ProfileCard.css'
import profileImg from '../../assets/images/profilr_pic.avif'
import { API_URL, IMG_URL } from '../../utils/constants'
import { toast } from 'react-toastify'
import PhotoUpdateModal from '../PhotoUpdateModal/PhotoUpdateModal'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {fetchUserData} from '../../Redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProfileUpadateModal from '../ProfileUpadateModal/ProfileUpadateModal'

const ProfileCards = () => {

  const detailsIcon = {
    name: <i className="bi bi-person text-info"></i>,
    gender: <i className="bi bi-gender-male text-info"></i>,
    role: <i className="bi bi-person-workspace text-info"></i>,
    age: <i className="bi bi-calendar3 text-info"></i>,
    // isAvtive: <i className="bi bi-person-fill-exclamation text-info"></i>
  }

  const dispatch = useDispatch();
  const {user}  = useSelector((store)=> store.userInfo)

  useEffect(()=>{
    if (!user) {
      dispatch(fetchUserData());
    }
  },[dispatch])


  return (
    <div className='container profile_container mt-3 p-0'>

      <div className='profile_card galss_card'>

        <div className="imgsec">
        <img className='profile_icon' src={user?.image ? IMG_URL + user.image : profileImg} alt="" />

          <span data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"><i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"></i></span>
        </div>

        <div className='profile_card_body'>
          <h5>{user?.name}</h5>
          <div className='d-flex '>
            <i className="bi bi-envelope-check me-2"></i> {user?.email}
          </div>

          <div className='d-flex '>
            <i className="bi bi-telephone me-2"></i>
            {
              user?.mobile ? user?.mobile : <div className="text-muted">Not Provided</div> 
            }
          </div>
        </div>

      </div>

      <div className='profileSection galss_card'>
        <div className='d-flex justify-content-between mb-3'>
          <h4>Account Details</h4><i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#profileModal"></i>
        </div>

        {
          Object.keys(detailsIcon).map((ele) => {
            return <div className='list mt-2' key={ele}>
              <div >
                {
                  detailsIcon[ele]
                }
                <span>{ele}</span>
              </div>
              <p> {user ? user[ele] || 'null' : 'null'}</p>
            </div>
          })
        }

      </div>

      <div className='address_section profileSection glass_card'>
        <div className='d-flex justify-content-between mb-3'>
          <h4>Address Details</h4><i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#profileModal"></i>
        </div>

        <div className='list pt-1'>
          <div >
            <i className="bi bi-person"></i>
            <span>Name</span>
          </div>
          <p> manaf s</p>
        </div>

      </div>
      <ProfileUpadateModal />
      <PhotoUpdateModal  />
     
    </div>
  )
}

export default ProfileCards
