import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import './EditBlog.scss'

const EditBlog = () => {
  const { getInfo } = useSelector(state => state.blog)

  const data = getInfo?.data
  // console.log(data)//
  const navigate = useNavigate()

  return (
    <div className='bloginfo'>
      {data?.map(({ id, title, description, imgs, created_at, updated_at }) => {
        return (
          <div onClick={() => navigate(`/blog/edit/${id}`)} className='bloginfo__card' key={id}>
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
    </div>
  )
}

export default EditBlog
