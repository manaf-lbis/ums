import React from 'react'
import avtar from '../../assets/images/profilr_pic.avif'
import './UserCard.css'
import { API_URL, IMG_URL } from '../../utils/constants'


const UserCard = ({data,update,setUpdateModal}) => {
  
  const blockUser = async (id)=>{
    const res = await fetch(API_URL+`/admin/blockUser/?id=${id}`,{credentials:'include'})
    if(res.ok){
      update(true)
    }
  }
  const unblockUser = async (id)=>{
    const res = await fetch(API_URL+`/admin/unBlockUser/?id=${id}`,{credentials:'include'})
    if(res.ok){
      update(true)
    }
  }
  
  return (
      <div class="glass-card">
        <div class="d-flex flex-column align-items-center">
          <img class="profilePic" src={data.image?  IMG_URL+data.image : avtar} alt="User Avatar" />
          <h5 class="mt-2 mb-1">{data.name}</h5>
          <p class="text-muted mb-3">{data.email}</p>
        </div>
        <div class="d-flex justify-content-center gap-2">
          {
            data.isAvtive ?
            <button type="button" class="btn btn-outline-danger btn-custom" onClick={()=>blockUser(data._id)}>Block</button> :
            <button type="button" class="btn btn-outline-success btn-custom" onClick={()=>unblockUser(data._id)}>unBlock</button>
          }
          
          <button type="button" class="btn btn-primary btn-custom" data-bs-toggle="modal" data-bs-target="#profileModal" onClick={()=>setUpdateModal(data)} >Update</button>
        </div>
        
      </div>
  )
}

export default UserCard
