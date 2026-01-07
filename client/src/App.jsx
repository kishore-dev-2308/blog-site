import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import apiPrivate from "./api/apiPrivate";
import { setUser, clearUser } from "./store/authSlice";
import AppLoader from "./components/Common/AppLoader.jsx";

/* ================= LAZY IMPORTS ================= */

// --- AUTH ---
const Login = lazy(() => import("./components/AuthLayout/Login"));
const Register = lazy(() => import("./components/AuthLayout/Register"));
const AuthLayout = lazy(() => import("./components/AuthLayout/AuthLayout"));

// --- PUBLIC ---
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));
const UserLayout = lazy(() => import("./components/userLayout/userLayout"));

// --- AUTHOR ---
const AuthorLayout = lazy(() => import("./components/AuthorLayout/AuthorLayout.jsx"));
const AuthorDashboard = lazy(() => import("./components/AuthorLayout/Dashboard.jsx"));
const AuthorPosts = lazy(() => import("./components/AuthorLayout/Posts.jsx"));
const CreateBlog = lazy(() => import("./components/AuthorLayout/CreateBlog.jsx"));
const EditBlog = lazy(() => import("./components/AuthorLayout/EditBlog.jsx"));
const ViewBlog = lazy(() => import("./components/AuthorLayout/ViewBlog.jsx"));

// --- ADMIN ---
const AdminLayout = lazy(() => import("./components/AdminLayout/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("./components/AdminLayout/Dashboard.jsx"));
const AdminUsers = lazy(() => import("./components/AdminLayout/Users.jsx"));
const AdminPosts = lazy(() => import("./components/AdminLayout/Posts.jsx"));

// --- COMMON ---
const NotFound = lazy(() => import("./components/Common/NotFound.jsx"));
const ServerError = lazy(() => import("./components/Common/ServerError.jsx"));
const ProtectedRoute = lazy(() => import("./components/Common/ProtectedRoute.jsx"));
const Profile = lazy(() => import("./components/Common/profile/Profile.jsx"));

/* ================= APP ================= */

function App() {
  const { isBootstrapped } = useSelector((s) => s.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isBootstrapped) return; 
    const checkAuth = async () => {
      try {
        const { data } = await apiPrivate.get("/auth/me");
        dispatch(setUser(data));
      } catch {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [isBootstrapped, dispatch]);

  return (
    <Suspense
      fallback={
        // <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
        //   Loading...
        // </div>
        <AppLoader />
      }
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <BrowserRouter>
        <Routes>

          {/* ================= AUTH ROUTES ================= */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ================= AUTHOR ROUTES ================= */}
          <Route element={<ProtectedRoute allowedRoles={[2]} />}>
            <Route path="/author" element={<AuthorLayout />}>
              <Route index element={<AuthorDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="posts">
                <Route index element={<AuthorPosts />} />
                <Route path="create" element={<CreateBlog />} />
                <Route path="view/:id" element={<ViewBlog />} />
                <Route path="edit/:id" element={<EditBlog />} />
              </Route>
            </Route>
          </Route>

          {/* ================= ADMIN ROUTES ================= */}
          <Route element={<ProtectedRoute allowedRoles={[1]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="posts" element={<AdminPosts />} />
            </Route>
          </Route>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Route>

          {/* ================= ERROR ROUTES ================= */}
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
