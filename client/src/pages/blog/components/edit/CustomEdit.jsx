import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomEdit = () => {
    const navigate = useNavigate()

    return (
        <div>
            Welcome
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    )
}

export default CustomEdit
