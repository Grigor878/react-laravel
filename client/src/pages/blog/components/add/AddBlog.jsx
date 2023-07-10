import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addBlogInfo } from '../../../../store/slices/blogSlice'
import InputById from '../../../../components/inputs/InputById'
import { ImgsUpload } from '../../../../components/inputs/ImgsUpload'
import SubmitBtn from '../../../../components/inputs/SubmitBtn'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import baseApi from '../../../../apis/baseApi'
import { getAxiosConfig } from '../../../../apis/config'
import { error, success } from '../../../../components/swal/swal'
import './AddBlog.scss'

const AddBlog = () => {
    // const dispatch = useDispatch()
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    const uploadImgs = (e) => {
        const files = Array.from(e.target.files)
        const uploadedImages = files.map((file) => URL.createObjectURL(file))

        setImages((prevImages) => [...prevImages, ...files])
        setPreviewImages((prevPreviews) => [...prevPreviews, ...uploadedImages])
    }

    const removeImg = (index) => {
        setImages((prevPreviews) => {
            const updatedPreviews = [...prevPreviews]
            updatedPreviews.splice(index, 1)
            return updatedPreviews
        });
        setPreviewImages((prevPreviews) => {
            const updatedPreviews = [...prevPreviews]
            updatedPreviews.splice(index, 1)
            return updatedPreviews
        });
    }

    // const { newBlogId } = useSelector(state => state.blog)
    // console.log(newBlogId)//

    const handleSubmit = (e) => {
        e.preventDefault()

        const blogInfo = {
            title: e.target.blogTitle.value,
            description: e.target.blogDescription.value,
        }

        // dispatch(addBlogInfo({ blogInfo }))

        if (images.length === 0) {
            return error("Upload Imgs!")
        }

        baseApi.post('/api/blog', blogInfo, getAxiosConfig())
            .then(res => {
                const formData = new FormData();

                images.forEach((file, index) => {
                    formData.append(`file${index}`, file);
                    formData.append('blog_id', res.data.data.id);
                });

                baseApi.post('/api/uploadBlogImgs', formData, getAxiosConfig())
                    .then(res => {
                        success(res.data.message)
                    })
                    .catch(err => {
                        error(err.response.data.message)
                    })
            })
            .catch(err => {
                error(err.response.data.message)
            }).finally(
                e.target.blogTitle.value = "",
                e.target.blogDescription.value = "",
                setPreviewImages([]),
                setImages([])
            )
    }

    return (
        <div className='addblog'>
            <form onSubmit={handleSubmit} className='addblog__upload'>
                <InputById id="blogTitle" type="text" placeholder="Title" />
                <InputById id="blogDescription" type="text" placeholder="Description" />
                <ImgsUpload onChange={uploadImgs} />
                <SubmitBtn text="Enter" />
            </form>
            <div className='addblog__imgs'>
                {previewImages && previewImages.map((preview, index) => (
                    <div key={index} className='addblog__imgs-card'>
                        <img src={preview} alt="uploadedImg" />
                        <button
                            type='button'
                            onClick={() => removeImg(index)}
                        ><RiDeleteBin6Fill />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddBlog
