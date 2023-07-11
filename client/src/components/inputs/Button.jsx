import React from 'react'

const Button = ({ color, text, onClick }) => {
    return (
        <button
            color={color}
            type='button'
            className='click-btn'
            onClick={onClick}
            style={{
                background: color === "red" ? "#bb3434" : "#4a46f1",
                fontSize: color === "red" ? "15px" : "17px",
            }}
        >
            {text}
        </button >
    )
}

export default Button
