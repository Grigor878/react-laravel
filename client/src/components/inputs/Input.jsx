import React from 'react'
import './Styles.scss'

const Input = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            required
            className='input'
            defaultValue={value}
            onChange={onChange}
        />
    )
}

export default Input
