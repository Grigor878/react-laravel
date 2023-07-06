import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InputById from '../../../../components/inputs/InputById'
import { ImgsUpload } from '../../../../components/inputs/ImgsUpload'
import SubmitBtn from '../../../../components/inputs/SubmitBtn'
import baseApi from '../../../../apis/baseApi'
import { API_BASE_URL, getAxiosConfig } from '../../../../apis/config'
import { error, success } from '../../../../components/swal/swal'

const AddBlog = () => {
    const { userInfo } = useSelector(state => state.auth)
    console.log(userInfo?.id);
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    const uploadImgs = (e) => {
        const files = Array.from(e?.target?.files)
        const uploadedImages = files.map((file) => URL.createObjectURL(file))

        setImages((prevImages) => [...prevImages, ...files])
        setPreviewImages((prevPreviews) => [...prevPreviews, ...uploadedImages])
    }

    const removeImg = (index) => {
        setPreviewImages((prevPreviews) => {
            const updatedPreviews = [...prevPreviews]
            updatedPreviews.splice(index, 1)
            return updatedPreviews
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();

        Array.from(images).forEach((file) => {
            formData.append('file', file);
            formData.append('fileName', file.name);
        });

        // if (formData.entries().next().done) {
        //     error("Upload Img")
        //     return
        // }

        const data = {
            title: e.target.blogTitle.value,
            description: e.target.blogDescription.value,
        }

        baseApi.post('/api/blog', data, getAxiosConfig())
            // baseApi.post('/api/uploadBlogImgs', formData, getAxiosConfig())
            .then(res => {
                success(res.data.message)
            })
            .catch(err => {
                error(err.response.data.message)
            }).finally(
                e.target.blogTitle.value = "",
                e.target.blogDescription.value = "",
                setImages([]),
            )
    }

    return (
        <div className='addblog'>
            <form onSubmit={handleSubmit} className='blog__upload'>
                <p>Add new blog</p>
                <InputById id="blogTitle" type="text" placeholder="Title" />
                <InputById id="blogDescription" type="text" placeholder="Description" />
                <ImgsUpload onChange={uploadImgs} />
                {previewImages && previewImages.map((preview, index) => (
                    <div key={index}>
                        <img src={preview} alt="uploadedImg" />
                        <button onClick={() => removeImg(index)}>Remove</button>
                    </div>
                ))}
                <SubmitBtn text="Enter" />
            </form>
        </div>
    )
}

export default AddBlog
