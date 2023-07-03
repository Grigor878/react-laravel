import React from 'react'
import './Styles.scss'

const Input = ({ id, type, placeholder }) => {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            required
            className='input'
        />
    )
}

export default Input
