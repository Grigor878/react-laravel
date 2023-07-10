import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogInfo, getBlogInfo } from '../../../../store/slices/blogSlice'
import moment from 'moment'
import { API_BASE_URL } from '../../../../apis/config'
import './Blogs.scss'

const Blogs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlogInfo())
    }, [dispatch])

    const { getLoading, getInfo } = useSelector(state => state.blog)

    const data = getInfo?.data
    // console.log(data);

    return (
        <div className='bloginfo' >
            {getLoading && data
                ? <p>Loading...</p>
                : !data?.length
                    ? <p>There is no available data!</p> :
                    data?.map(({ id, title, description, images, created_at, updated_at }) => {
                        return (
                            <div className='bloginfo__card' key={id}>
                                <div className='bloginfo__card-redirects'>
                                    <Link
                                        className='bloginfo__card-redirects-view'
                                        to={`view/${id}`}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        className='bloginfo__card-redirects-edit'
                                        to={`edit/${id}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className='bloginfo__card-redirects-delete'
                                        onClick={() => dispatch(deleteBlogInfo({ id }))}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className='bloginfo__card-imgs'>
                                    {JSON.parse(images?.name).slice(0, 1).map((el) => {
                                        return (
                                            <img key={el} src={API_BASE_URL + `/images/` + el} alt="img" />
                                        )
                                    })}
                                </div>

                                <div className='bloginfo__content'>
                                    <h4>{title}</h4>

                                    <p>{description}</p>

                                    <div className='bloginfo__content-date'>
                                        <span>Added - {moment(created_at).fromNow()}</span>
                                        <span>Updated - {moment(updated_at).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
        </div >
    )
}

export default Blogs
