import React from 'react'
import '../../Blog.scss'

const Tab = ({ active, setActive }) => {
    return (
        <nav className='blog__tab'>
            <ul className='blog__tab-list'>
                <li
                    onClick={() => setActive('info')}
                    className={active === "info" ? 'blog__tab-linkActive' : 'blog__tab-link'}
                >Blogs </li>
                <li
                    onClick={() => setActive('add')}
                    className={active !== "add" ? 'blog__tab-link' : 'blog__tab-linkActive'}

                >Add</li>
            </ul>
        </nav>
    )
}

export default Tab
