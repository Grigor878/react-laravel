import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogInfo } from '../../../../store/slices/blogSlice'
import moment from 'moment'
import './BlogInfo.scss'

const BlogInfo = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlogInfo())
    }, [dispatch])

    const { getLoading, getInfo } = useSelector(state => state.blog)

    const data = getInfo?.data

    return (
        <div className='bloginfo' >
            {getLoading && data
                ? <p>Loading...</p>
                : !data?.length
                    ? <p>There is no available data!</p> :
                    data?.map(({ id, title, description, imgs, created_at, updated_at }) => {
                        return (
                            <div className='bloginfo__card' key={id}>
                                <div className='bloginfo__imgs'>
                                    {/* {imgs} */}Img part
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

export default BlogInfo
