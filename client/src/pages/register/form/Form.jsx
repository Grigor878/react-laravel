import React from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../../store/slices/authSlice'
import Input from '../../../components/inputs/Input'
import SubmitBtn from '../../../components/inputs/SubmitBtn'
import './Form.scss'

const Form = () => {
    const dispatch = useDispatch()

    const handleRegister = (e) => {
        e.preventDefault()

        const name = e.target.registerName.value
        const email = e.target.registerEmail.value
        const password = e.target.registerPassword.value

        dispatch(register({ name, email, password }))

        e.target.registerName.value = ""
        e.target.registerEmail.value = ""
        e.target.registerPassword.value = ""
    }

    return (
        <form onSubmit={handleRegister} className='register-form'>
            <Input id="registerName" type="text" placeholder="Name" />
            <Input id="registerEmail" type="email" placeholder="Email" />
            <Input id="registerPassword" type="password" placeholder="Password" />
            <SubmitBtn text="Enter" />
        </form>
    )
}

export default Form
