import React, { useState } from 'react'
import './Profile.scss'
import { useSelector, useDispatch } from 'react-redux'
import { ImgUpload } from '../../components/inputs/ImgUpload'
import { setUserImg } from '../../store/slices/authSlice'
import baseApi from '../../apis/baseApi'
import { API_BASE_URL, getAxiosConfig } from '../../apis/config'
import { error, success } from '../../components/swal/swal'
import moment from 'moment'

const Profile = () => {
  const { userInfo, userImg } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  console.log(userInfo)//
  console.log(userImg)//

  // const [avatar, setAvatar] = useState(userImg?.img === userInfo?.photo ? userImg?.img : userInfo?.photo)
  const [avatar, setAvatar] = useState(userImg?.img ? userImg?.img : userInfo?.photo)
  const [uploaded, setUploaded] = useState([])
  const [avatarUrl, setAvatarUrl] = useState([])

  const uploadImage = (e) => {
    setUploaded(e.target.files[0])

    let selectedAvatar = e.target.files
    let selectedArray = Array.from(selectedAvatar)

    setAvatarUrl(selectedArray.map((file) => {
      return URL.createObjectURL(file)
    }))
  }

  const removeAvatar = () => {
    setAvatar()
    setAvatarUrl([])
    setUploaded([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', uploaded)
    formData.append('fileName', uploaded?.name)

    baseApi.post('/api/uploadImg', formData, getAxiosConfig())
      .then((res) => {
        const img = res.data.data.avatar
        setAvatar(img)
        success(res.data.success)
        dispatch(setUserImg({ img }))
        setUploaded([])
      })
      .catch(err => error(err.message))
  }

  return (
    <div className='profile'>
      <div className="container">
        <h3>Username - {userInfo?.name}</h3>

        <div className='profile__info'>
          {avatar && avatarUrl.length === 0
            ? <div className='profile__info-uploaded'>
              <img src={API_BASE_URL + '/images/' + avatar} alt="User" />
              <button
                onClick={removeAvatar}
              >X</button>
            </div>
            : null
          }
          {!avatarUrl.length === 0 || !avatar
            ? <ImgUpload onChange={uploadImage} />
            : avatarUrl.map((img, index) => {
              return (
                <div key={index} className='profile__info-uploaded'>
                  <img src={img} alt="Uploaded Avatar" />
                  <button
                    onClick={removeAvatar}
                  >X</button>
                </div>
              )
            })
          }

          {uploaded.length !== 0 &&
            <button className='profile__info-btnSave' onClick={(e) => handleSubmit(e)}>Save</button>
          }

          <span>Created {moment(userInfo?.created_at).fromNow()}</span>
          <span>Last update {moment(userInfo?.updated_at).fromNow()}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile


// {uploaded.length === 0
//   ? <ImgUpload onChange={uploadImage} />
//   : avatarUrl.map((img, index) => {
//     return (
//       <div key={index} className='profile__info-uploaded'>
//         <img src={userInfo?.photo ? API_BASE_URL + '/images/' + userInfo?.photo : img} alt="Uploaded Avatar" />
//         <button
//           onClick={removeAvatar}
//         >X</button>
//       </div>
//     )
//   })
// }