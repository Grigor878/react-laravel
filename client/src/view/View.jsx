import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Loader } from "../components/loader/Loader";
import Login from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import Register from "../pages/register/Register";
import Layout from "../components/layout/Layout";

const Profile = lazy(() => import("../pages/profile/Profile"));
const Blog = lazy(() => import("../pages/blog/Blog"));
const ViewBlog = lazy(() => import("../pages/blog/pages/view/ViewBlog"));
const EditBlog = lazy(() => import("../pages/blog/pages/edit/EditBlog"));

const View = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn && token ? <Layout /> : <Navigate to="/login" />
            }
          >
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route index path="/profile" element={<Profile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/view/:id" element={<ViewBlog />} />
            <Route path="/blog/edit/:id" element={<EditBlog />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/login">
            <Route
              index
              element={
                isLoggedIn && token ? <Navigate to="/profile" /> : <Login />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default View;
