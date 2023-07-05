import React from 'react'

export const ImgsUpload = ({ onChange }) => {
    return (
        <label className='imgUpload'>
            Upload Imgs
            <input
                type='file'
                name='images'
                onChange={onChange}
                accept='image/png , image/jpeg , image/jpg , image.webp'
                multiple
            />
        </label>
    )
}