import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditBlog = () => {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>
            <h1>Blog edit page</h1>
        </div>
    )
}

export default EditBlog
