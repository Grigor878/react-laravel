import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewBlogInfo } from '../../../../store/slices/blogSlice'
import { useNavigate, useParams } from 'react-router-dom'

const BlogView = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(viewBlogInfo({ id }))
    }, [dispatch, id])

    const { viewInfo } = useSelector(state => state.blog)
    console.log(viewInfo)//
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>
            <h1>Blog view page</h1>
        </div>
    )
}

export default BlogView
