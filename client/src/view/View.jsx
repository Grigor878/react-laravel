import React, { Suspense, lazy } from 'react'
import { useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from '../pages/login/Login'
import NotFound from '../pages/notFound/NotFound'
import Register from '../pages/register/Register'

const Profile = lazy(() => import('../pages/profile/Profile'))

const View = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth)

    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route index path="/" element={isLoggedIn && token ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={isLoggedIn && token ? <Navigate to="/profile" /> : <Login />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/profile" element={isLoggedIn && token ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    )
}
export default View