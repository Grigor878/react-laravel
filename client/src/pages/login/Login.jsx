import React from 'react'
import { useSelector } from 'react-redux'
import Form from './form/Form'
import './Login.scss'

const Login = () => {
  const { loginLoading } = useSelector(state => state.auth)

  return (
    <div className='login' >
      {loginLoading
        ? <p>Loading</p>
        : <>
          <h3>Log-In</h3>
          <Form />
        </>}
    </div >
  )
}

export default Login
