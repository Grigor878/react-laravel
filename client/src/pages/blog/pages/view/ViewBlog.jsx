import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewBlogInfo } from '../../../../store/slices/blogSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../components/inputs/Button'
import './ViewBlog.scss'

const ViewBlog = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(viewBlogInfo({ id }))
    }, [dispatch, id])

    const { viewInfo } = useSelector(state => state.blog)
    const navigate = useNavigate()
    
    const data = viewInfo?.data
    console.log(data)//

    return (
        <div className='viewBlog'>
            <div className="container">
                <Button
                    text="Go Back"
                    onClick={() => navigate(-1)}
                />

            </div>
        </div>
    )
}

export default ViewBlog
