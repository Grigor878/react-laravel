import React, { Suspense } from 'react'
import Header from '../header/Header'
import { Loader } from '../loader/Loader'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense >
        </>
    )
}

export default Layout
