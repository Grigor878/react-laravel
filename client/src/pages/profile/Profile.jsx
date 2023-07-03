import React from 'react'
import './Profile.scss'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'

const Profile = () => {

  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  console.log(token)//

  return (
    <div className='profile'>
      <h3>Welcome to personal page.</h3>

      <div className='profile__info'>
        <p>Your token is - {token}</p>
        <button onClick={() => dispatch(logout())}>Log-Out</button>
      </div>
    </div>
  )
}

export default Profile
