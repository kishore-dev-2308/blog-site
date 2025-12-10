import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- PUBLIC PAGES ---
const Login = lazy(() => import("./components/AuthLayout/Login"));
const Register = lazy(() => import("./components/AuthLayout/Register"));
const AuthLayout = lazy(() => import("./components/AuthLayout/AuthLayout"));

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const ServerError = lazy(() => import("./pages/ServerError.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));

// --- USER ---
const UserLayout = lazy(() => import("./components/userLayout/userLayout"));

// --- AUTHOR ---
const AuthorLayout = lazy(() => import("./components/AuthorLayout/AuthorLayout.jsx"));
const AuthorDashboard = lazy(() => import("./components/AuthorLayout/Dashboard.jsx"));
const AuthorPosts = lazy(() => import("./components/AuthorLayout/Posts.jsx"));
const AuthorProfile = lazy(() => import("./components/AuthorLayout/Profile.jsx"));

// --- ADMIN ---
const AdminLayout = lazy(() => import("./components/AdminLayout/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("./components/AdminLayout/Dashboaed.jsx"));
const AdminUsers = lazy(() => import("./components/AdminLayout/Users.jsx"));
const AdminPosts = lazy(() => import("./components/AdminLayout/Posts.jsx"));

function App() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
        Loading...
      </div>
    }>
      <BrowserRouter>

        <Routes>

          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>


          {/* PUBLIC SITE ROUTES */}
          <Route element={<UserLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/500" element={<ServerError />} />
          </Route>


          {/* AUTHOR ROUTES */}
          <Route path="/author" element={<AuthorLayout />}>
            <Route index element={<AuthorDashboard />} />
            <Route path="posts" element={<AuthorPosts />} />
            <Route path="profile" element={<AuthorProfile />} />
          </Route>


          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="posts" element={<AdminPosts />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
