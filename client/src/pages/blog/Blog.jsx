import React from 'react'
import { useSesionState } from '../../hooks/useSesionState'
import Tab from './components/tab/Tab'
import BlogInfo from './components/info/BlogInfo'
import AddBlog from './components/add/AddBlog'
import EditBlog from './components/edit/EditBlog'
import './Blog.scss'

const Blog = () => {
    const [active, setActive] = useSesionState('info', 'blogPage')
    // const [title, setTitle] = useState('')
    // const [desc, setDesc] = useState('')

    return (
        <div className='blog'>
            <Tab active={active} setActive={setActive} />

            {active === "info"
                ? <BlogInfo />
                : active === "add"
                    ? <AddBlog />
                    : <EditBlog />
            }
        </div>
    )
}

export default Blog