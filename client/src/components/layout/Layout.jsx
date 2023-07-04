import React, { Suspense } from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
            </Suspense >
        </>
    )
}

export default Layout
