import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import apiPublic from "../../api/apiPublic";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/authSlice";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                setError("");

                const response = await apiPublic.post(
                    "/auth/login",
                    {
                        email: values.email,
                        password: values.password,
                        device: navigator.userAgent,
                    },
                );

                if (!response.data.success) {
                    setError(
                        response.data.message || "Invalid email or password"
                    );
                    return;
                }

                dispatch(setUser(response.data.user));
                toast.success("Login successful 🎉");
                if (response.data.user.role === 1) navigate("/admin");
                else if (response.data.user.role === 2) navigate("/author");
                else navigate("/");

            } catch (err) {
                setError(
                    err?.response?.data?.message || "Invalid email or password"
                );
                console.error("Login error:", err);
            }
        },
    });

    return (
        <div className="d-flex flex-column align-items-center w-100">
            <h3 className="mb-4 text-center fw-bold">Welcome Back 👋</h3>

            <form
                onSubmit={formik.handleSubmit}
                className="w-100"
                style={{ maxWidth: "400px" }}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control rounded-pill ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
                            }`}
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label fw-semibold">
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className={`form-control rounded-pill pe-5 ${formik.touched.password && formik.errors.password
                                ? "is-invalid"
                                : ""
                                }`}
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn position-absolute end-0 top-0 me-2 border-0 bg-transparent"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback d-block">{formik.errors.password}</div>
                    )}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            className="form-check-input"
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
                        />
                        <label htmlFor="rememberMe" className="form-check-label">
                            Remember me
                        </label>
                    </div>
                    <a href="#" className="text-decoration-none small text-primary fw-semibold">
                        Forgot password?
                    </a>
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-semibold">
                    Login
                </button>

                <p className="text-center mt-3 mb-0">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-decoration-none fw-semibold text-primary">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
