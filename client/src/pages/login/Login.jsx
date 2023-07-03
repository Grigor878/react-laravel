import React from 'react'
import { useSelector } from 'react-redux'
import Form from './form/Form'
import './Login.scss'

const Login = () => {
  const { loading } = useSelector(state => state.auth)

  return (
    <div className='login' >
      {loading
        ? <p>Loading</p>
        : <>
          <h3>Log-In</h3>
          <Form />
        </>}
    </div >
  )
}

export default Login
