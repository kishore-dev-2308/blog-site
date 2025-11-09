import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/AuthLayout/Login";
import Register from "./components/AuthLayout/Register";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import UserLayout from "./components/userLayout/userLayout";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const ServerError = lazy(() => import("./pages/ServerError.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));

function App() {
  return (
    <Suspense fallback={<div className="text-center my-5">Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<UserLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/500" element={<ServerError />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
