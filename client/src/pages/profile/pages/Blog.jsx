import React, { useState } from 'react'
import Input from '../../../components/inputs/Input'
import { ImgsUpload } from '../../../components/inputs/ImgsUpload'
import SubmitBtn from '../../../components/inputs/SubmitBtn'
import './Blog.scss'

const Blog = () => {
    const [imgs, setImgs] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const title = e.target.blogTitle.value
        const description = e.target.blogDescription.value

        console.log(title)//
        console.log(description)//
    }

    const uploadImgs = (e) => {
        const files = Array.from(e?.target?.files)
        const uploadedImages = files.map((file) => URL.createObjectURL(file))

        console.log(uploadedImages)//
    }

    return (
        <div className='blog'>
            <div className="container">
                <h2>Blog Page</h2>

                <form onSubmit={handleSubmit} className='blog__upload'>
                    <p>Add new blog</p>
                    <Input id="blogTitle" type="text" placeholder="Title" />
                    <Input id="blogDescription" type="text" placeholder="Description" />
                    <ImgsUpload onChange={uploadImgs} />
                    <SubmitBtn text="Enter" />
                </form>
            </div>
        </div>
    )
}

export default Blog
