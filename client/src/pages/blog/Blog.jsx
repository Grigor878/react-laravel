import React from 'react'
import { useSesionState } from '../../hooks/useSesionState'
import Tab from './components/tab/Tab'
import Blogs from './components/view/Blogs'
import AddBlog from './components/add/AddBlog'
import './Blog.scss'

const Blog = () => {
    const [active, setActive] = useSesionState('info', 'blogPage')

    return (
        <div className='blog'>
            <Tab active={active} setActive={setActive} />

            {active === "info" ? <Blogs /> : <AddBlog />}
        </div>
    )
}

export default Blog