import React, { useEffect, useState } from 'react'
import Input from '../../components/inputs/Input'
import { ImgsUpload } from '../../components/inputs/ImgsUpload'
import SubmitBtn from '../../components/inputs/SubmitBtn'
import './Blog.scss'
import baseApi from '../../apis/baseApi'
import { getAxiosConfig } from '../../apis/config'
import { error, success } from '../../components/swal/swal'

const Blog = () => {
    // const [title, setTitle] = useState('')
    // const [desc, setDesc] = useState('')
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    console.log(images)//

    useEffect(() => {
        baseApi.post('/api/blog', getAxiosConfig())
            .then(res => console.log(res.data.data))
            .catch(err => console.log(err.response.data))
    }, [])

    const uploadImgs = (e) => {
        const files = Array.from(e?.target?.files)
        const uploadedImages = files.map((file) => URL.createObjectURL(file))

        setImages((prevImages) => [...prevImages, ...files])
        setPreviewImages((prevPreviews) => [...prevPreviews, ...uploadedImages])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // const formData = new FormData();

        // Array.from(images).forEach((file) => {
        //     formData.append('images', file);
        //     formData.append('imageNames[]', file.name);
        // });

        // console.log(formData);

        const namesString = images.map(obj => obj.name).join(', ');

        if (!namesString.length) {
            error("Upload Img")
            return
        }

        const data = {
            title: e.target.blogTitle.value,
            description: e.target.blogDescription.value,
            imgs: namesString ? namesString : "",
        }

        baseApi.post('/api/blog', data, getAxiosConfig())
            .then(res => {
                success(res.data.message)
            })
            .catch(err => {
                console.log(err.response.data.error)
                error(err.response.data.message)
            }).finally(
                e.target.blogTitle.value = "",
                e.target.blogDescription.value = "",
                setImages([])
            )


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

// headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },