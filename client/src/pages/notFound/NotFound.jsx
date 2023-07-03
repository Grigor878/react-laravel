import React from 'react'
import notFound from '../../assets/imgs/notFound.avif'
import './NotFound.scss'

const NotFound = () => {
    return (
        <div className='notFound'>
            <img src={notFound} alt="notFound" />
        </div>
    )
}

export default NotFound
