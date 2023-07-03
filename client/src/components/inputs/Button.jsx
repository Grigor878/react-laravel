import React from 'react'

const Button = ({ text, onClick }) => {
    return (
        <button type='button' className='click-btn' onClick={onClick}>
            {text}
        </button>
    )
}

export default Button
