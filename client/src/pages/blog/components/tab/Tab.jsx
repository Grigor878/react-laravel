import React from 'react'
import '../../Blog.scss'

const Tab = ({ active, setActive }) => {
    return (
        <nav className='blog__tab'>
            <ul className='blog__tab-list'>
                <li
                    onClick={() => setActive('info')}
                    className={active === "info" ? 'blog__tab-linkActive' : 'blog__tab-link'}
                >
                    Info
                </li>
                <li
                    onClick={() => setActive('add')}
                    className={active !== "add" ? 'blog__tab-link' : 'blog__tab-linkActive'}

                >
                    Add
                </li>
                <li
                    onClick={() => setActive('edit')}
                    className={active !== "edit" ? 'blog__tab-link' : 'blog__tab-linkActive'}

                >
                    Edit
                </li>
            </ul>

            {/* {active === "info"
                ? <h3>User Blog</h3>
                : active === "add"
                    ? <h3>Add Blog</h3>
                    : <h3>Edit Blog</h3>
            } */}
        </nav>
    )
}

export default Tab
