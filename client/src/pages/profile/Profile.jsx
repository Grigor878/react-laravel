import React from 'react'
import './Profile.scss'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import Button from '../../components/inputs/Button'
import user from '../../assets/imgs/user.png'

const Profile = () => {
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <div className='profile'>
      <h3>Welcome to personal page.</h3>

      <div className='profile__info'>
        <img src={user} alt="add img" />
        <p>Your token is - {token}</p>
        <Button text="Log-Out" onClick={() => dispatch(logout())} />
      </div>
    </div>
  )
}

export default Profile
