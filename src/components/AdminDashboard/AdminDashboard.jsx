import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import UserCard from '../UserCard/UserCard'
import { API_URL, IMG_URL } from '../../utils/constants'
import avtar from '../../assets/images/profilr_pic.avif'
import { toast } from 'react-toastify'
import ProfileUpadateModal from '../ProfileUpadateModal/ProfileUpadateModal'

const AdminDashboard = () => {

  const [pendingList, setpendingList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userUpdate, setUserUpdate] = useState(false)
  const [updateModal,setUpdateModal]= useState({})
  const [searchQuery,setSearchQuery] = useState('');
  const [searchResult,setSearchResult] = useState([])


  const fetchData = async () => {
    const res1 = await fetch(API_URL + '/admin/pendingList', { credentials: 'include' });
    const res2 = await fetch(API_URL + '/admin/userList', { credentials: 'include' });

    if (res1.ok) {
      setpendingList(await res1.json())
    }
    if (res2.ok) {
      setUserList(await res2.json())
    }
    setUserUpdate(false)
  }

  const performSearch = ()=>{

    setSearchResult(userList.filter((user)=>{
      console.log(user.name);
      
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    }))
  }

  useEffect(() => {
    fetchData()
  }, [userUpdate]);

  const changeStatus = async (status,id)=>{
    const res = await fetch(API_URL+`/admin/newUserStatusChange/?status=${status}&userId=${id}`,{credentials:'include'});
    if(res.ok){
      setUserUpdate(true)
    }else{
      toast.error('failed to update try again')
    }
  }


  return (
    <div>
      <div className='container heading mt-3 glass_card d-flex justify-content-between'>
        <div className='d-flex'>
           <i className="bi bi-speedometer2 icon"></i>
          <h2 h2 className='text-dark'>Dashboard</h2>
        </div>
        <div className="searchcontainerr">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" value={searchQuery} aria-label="Search" onChange={(e)=>setSearchQuery(e.target.value)}/>
          <button class="btn btn-outline-success ms-1" onClick={performSearch} type="submit">Search</button>
         </div>

      </div>

      <div className='container d-flex gap-2 mt-3'>
        <div className='userList glass_card'>
          <h5>Users</h5>
          <div className='d-flex userLIsting'>
            {
              searchResult.length > 0 ?
              searchResult && searchResult?.map((user, index) => {
                return <UserCard key={index} data={user} update={setUserUpdate} setUpdateModal={setUpdateModal}  />
              }):
              userList && userList?.map((user, index) => {
                return <UserCard key={index} data={user} update={setUserUpdate} setUpdateModal={setUpdateModal}  />
              })
            }
          </div>
        </div>


        <div className='approveList glass_card'>
          <h5 className="text-center">Pending for Approval</h5>
          <ul className='appList'>

            {
              pendingList.map((data) => {
                return <li className='userCard'>
                  <div className="d-flex align-items-center gap-3">
                    <img class="profilePic" src={data.image?  IMG_URL+data.image : avtar} alt="User Avatar" />
                    <span className="email">{data.email}</span>
                  </div>
                  <div className='d-flex gap-2'>
                    <button type="button" onClick={()=>changeStatus(0,data._id)} className="btn listBtn btn-outline-danger">Reject</button>
                    <button type="button" onClick={()=>changeStatus(1,data._id)} className="btn listBtn btn-success">Approve</button>
                  </div>
                </li>
              })
            }

          </ul>
        </div>

      </div>
      <ProfileUpadateModal data={updateModal} setUserUpdate={setUserUpdate}/>
    </div>
  )
}

export default AdminDashboard
