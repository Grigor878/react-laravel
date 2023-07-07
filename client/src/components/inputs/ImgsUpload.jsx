import React from 'react'
import { FiUpload } from 'react-icons/fi';

export const ImgsUpload = ({ onChange }) => {
    return (
        <label className='imgUpload'>
            Upload Imgs <FiUpload />
            <input
                type='file'
                // name='images'
                onChange={onChange}
                accept='image/png , image/jpeg , image/jpg , image.webp'
                multiple
            />
        </label>
    )
}