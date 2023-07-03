import React, { useState } from 'react'
import './Profile.scss'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import Button from '../../components/inputs/Button'
import user from '../../assets/imgs/user.png'
import baseApi from '../../apis/baseApi'
import { getAxiosConfig } from '../../apis/config'
import { error, success } from '../../components/swal/swal'

const Profile = () => {
  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // console.log(userInfo)//

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
  console.log(uploaded)//
  console.log(avatarUrl)//

  const removeAvatar = () => {
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
        console.log(res.data)
      })
      .catch(err => error(err.message))
      .finally(() => {
        // setLoading(false)
        // navigate(-1)
        success('Img Uploaded')
      })
  }

  return (
    <div className='profile'>
      <h3>Welcome to personal page.</h3>

      {userInfo &&
        <div className='profile__info'>
          <input
            type='file'
            name='Avatar'
            onChange={uploadImage}
            accept='image/png , image/jpeg , image/jpg , image.webp'
          />
          <button onClick={() => removeAvatar()}>Reomove img</button>
          <button onClick={(e) => handleSubmit(e)}>Save</button>
          <p>{userInfo?.name}</p>
          <Button text="Log-Out" onClick={() => dispatch(logout())} />
        </div>
      }
    </div>
  )
}

export default Profile


// {!avatarUrl.length === 0
//   ? <label className='imgUpload'>
//     <img src={user} alt="Choose Avatar" />
//     <input
//       type='file'
//       name='Avatar'
//       onChange={uploadImage}
//       accept='image/png , image/jpeg , image/jpg , image.webp'
//     // multiple
//     />
//   </label>
//   : avatarUrl.map((img, index) => {
//     return (
//       <div key={index} className='subUsers__uploaded'>
//         <img src={img} alt="Uploaded Avatar" />
//         {/* <button
//           onClick={removeAvatar}
//         ><RiDeleteBin5Fill /></button> */}
//       </div>
//     )
//   })}