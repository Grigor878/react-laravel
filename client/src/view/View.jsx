import React, { Suspense, lazy } from 'react'
import { useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from '../pages/login/Login'
import NotFound from '../pages/notFound/NotFound'
import Register from '../pages/register/Register'
import Layout from '../components/layout/Layout'

const Profile = lazy(() => import('../pages/profile/Profile'))
const Blog = lazy(() => import('../pages/blog/Blog'))
const BlogView = lazy(() => import('../pages/blog/pages/view/BlogView'))
const EditBlog = lazy(() => import('../pages/blog/pages/edit/EditBlog'))

const View = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth)

    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="/" element={isLoggedIn && token ? <Layout /> : <Navigate to="/login" />}>
                        <Route index path="/profile" element={<Profile />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/view/:id" element={<BlogView />} />
                        <Route path="/blog/edit/:id" element={<EditBlog />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route path="/login">
                        <Route index element={isLoggedIn && token ? <Navigate to="/profile" /> : <Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    )
}
export default View