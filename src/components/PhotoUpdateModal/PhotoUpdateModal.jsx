import React, { useEffect, useState } from 'react'
import './PhotoUpdateModal.css'
import profileImg from '../../assets/images/profilr_pic.avif';
import SuccessCard from '../../components/SuccessCard1/SuccessCard1'
import { toast } from 'react-toastify'
import { API_URL, IMG_URL} from '../../utils/constants';
import { fetchUserData } from '../../Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';



const PhotoUpdateModal = () => {
  const [file, setFile] = useState()
  const [preview, setPreview] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const dispatch = useDispatch()
  const {user} = useSelector((store)=> store.userInfo)


  const chanagePreview = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile));
  }

  const handleSubmission = async () => {

    if (preview) {
      const form = new FormData()
      form.append('image', file)

      const response = await fetch(API_URL + '/imageUpdate', {
        method: 'POST',
        body: form,
        credentials: 'include'
      })

      if (response.ok) {
        setUploadSuccess(true)
        dispatch(fetchUserData())
      }

    } else {
      toast.error('please Choose an image')
    }

  }

  return (
    <div>
      <div
        className="modal fade "
        id="exampleModalCenter"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Change Profile Picture</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
              </button>
            </div>
            <div className="modal-body">

              {/* body */}
              {
                uploadSuccess ?
                  <>
                    <SuccessCard message='Profile Updated Sucessfull' />
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={()=>setUploadSuccess(false)}
                        >
                        back
                      </button>

                    </div>
                  </>
                  :
                  <>
                    <div className='profile_card galss_card'>
                      <div className="imgsec">
                        <img className='profile_icon' src={ preview ? preview : user?.image ? IMG_URL + user.image : profileImg }  alt="" />
                      </div>
                    </div>
                    <div className="my-3 ">
                      <input onChange={chanagePreview} accept="image/png, image/jpeg" className="form-control form-control-sm" id="formFileSm" type="file" />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal" 
                        onClick={()=>setPreview('')}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmission}>
                        Save changes
                      </button>
                    </div>
                  </>
              }

              {/* body */}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default PhotoUpdateModal
