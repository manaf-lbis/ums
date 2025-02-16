import React, { useState } from 'react'
import SuccessCard1 from '../SuccessCard1/SuccessCard1';
import Form from '../Form/Form';
import AdminForm from '../Form/AdminForm'
import { useSelector } from 'react-redux';


const ProfileUpadateModal = ({data }) => {
  const userInfo = useSelector((store)=>store.userInfo)
  const user = userInfo?.user || {}; 
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  return (
    <div>
      <div
        className="modal fade "
        id="profileModal"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Update Your Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
              </button>
            </div>

            <div className="modal-body">
              {
                uploadSuccess ?
                  <>
                    <SuccessCard1 message='Profile Updated Sucessfull' />
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => setUploadSuccess(false)}
                      >
                        back
                      </button>

                    </div>
                  </>
                  :user?.role==='user'? <Form setUploadSuccess={setUploadSuccess} data={data}/> : user?.role === 'admin' ? <AdminForm setUploadSuccess={setUploadSuccess} user={data}  /> :<></>
        

              }
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileUpadateModal
