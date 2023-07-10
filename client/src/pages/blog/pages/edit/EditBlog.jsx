import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editBlogInfo, viewBlogInfo } from '../../../../store/slices/blogSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../components/inputs/Button'
import moment from 'moment'
import './EditBlog.scss'

const EditBlog = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(viewBlogInfo({ id }))
    }, [dispatch, id])

    const { viewInfo } = useSelector(state => state.blog)

    const navigate = useNavigate()

    const data = viewInfo?.data[0]
    // console.log(data)//

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const handleSubmit = () => {
        const edited = {
            "user_id": data?.user_id,
            "title": title,
            "description": description
        }
        dispatch(editBlogInfo({ id, edited }))
    }

    useEffect(() => {
        setTitle(data?.title)
        setDescription(data?.description)
    }, [data?.description, data?.title])

    return (
        !data
            ? <p>Loading...</p>
            : <div className='editBlog'>
                <div className="container">
                    <div className='editBlog__context'>
                        <div className='editBlog__header'>
                            <Button
                                text="Go Back"
                                onClick={() => navigate(-1)}
                            />

                            <p>Blog ID - # {data.id}</p>
                        </div>

                        <div className='editBlog__main'>
                            <div className="editBlog__main-imgs">

                            </div>
                            <div className="editBlog__main-inputs">
                                <label>
                                    Title
                                    <input
                                        type="text"
                                        defaultValue={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Description
                                    <input
                                        type="text"
                                        defaultValue={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </label>

                                <button
                                    className='submit-btn'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>

                            <div className="editBlog__main-dates">
                                <span>Added - {moment(data.created_at).fromNow()}</span>
                                <span>Updated - {moment(data.updated_at).fromNow()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default EditBlog
