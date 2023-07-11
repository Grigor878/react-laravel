import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewBlogInfo } from '../../../../store/slices/blogSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../components/inputs/Button'
import moment from 'moment'
import { API_BASE_URL } from '../../../../apis/config'
import './ViewBlog.scss'
import { Loader } from '../../../../components/loader/Loader'

const ViewBlog = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(viewBlogInfo({ id }))
    }, [dispatch, id])

    const { viewInfo } = useSelector(state => state.blog)

    const navigate = useNavigate()

    const data = viewInfo?.data[0]
    console.log(data)//

    return (
        !data
            ? <Loader />
            : <div className='viewBlog'>
                <div className="container">
                    <div>
                        <div className="viewBlog__header">
                            <Button
                                text="Go Back"
                                onClick={() => navigate(-1)}
                            />

                            <p>Blog ID - # {data.id}</p>
                        </div>

                        <div className="viewBlog__main">
                            <div className="viewBlog__main-context">
                                <h2>{data.title}</h2>

                                <p>{data.description}</p>
                            </div>

                            <div className="viewBlog__main-imgs">
                                {JSON.parse(data.images.name).map((el) => {
                                    return (
                                        <img key={el} src={API_BASE_URL + `/images/` + el} alt="img" />
                                    )
                                })}
                            </div>
                        </div>

                        <div className="viewBlog__dates">
                            <span>Created - {moment(data.created_at).fromNow()}</span>
                            <span>Updated - {moment(data.updated_at).fromNow()}</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ViewBlog
