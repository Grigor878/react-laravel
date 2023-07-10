import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { login } from '../../../store/slices/authSlice'
import InputById from '../../../components/inputs/InputById'
import SubmitBtn from '../../../components/inputs/SubmitBtn'
import './Form.scss'

const Form = () => {
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()

        const email = e.target.loginEmail.value
        const password = e.target.loginPassword.value

        dispatch(login({ email, password }))
        e.target.loginEmail.value = ""
        e.target.loginPassword.value = ""
    }

    return (
        <form onSubmit={handleLogin} className='login-form' autoComplete="on">
            <InputById
                id="loginEmail"
                type="email"
                placeholder="Email"
                name="email"
            />
            <InputById
                id="loginPassword"
                type="password"
                placeholder="Password"
                name="password"
            />
            <SubmitBtn text="Enter" />

            <NavLink className="login-form__link" to='/register'>Registration</NavLink>
        </form>
    )
}

export default Form
