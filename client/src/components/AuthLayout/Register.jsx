import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import apiPublic from "../../api/apiPublic";
import { toast } from "react-toastify";
import apiPrivate from "../../api/apiPrivate";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Full name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm password is required"),
            terms: Yup.bool().oneOf([true], "You must accept terms & conditions"),
        }),
        onSubmit: async (values) => {
            const toastId = toast.loading("processing...");
            try {
                setError("");
                const response = await apiPrivate.post(
                    "/auth/register",
                    {
                        ...values
                    },
                );

                if (!response.data.success) {
                    setError(
                        response.data.message || "Registration failed"
                    );
                    return;
                }
                toast.update(toastId, {
                    render: "Registration successful 🎉 | Verification email sent",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                // navigate("/login");
                navigate(`/verify-email-sent?email=${form.email}`);


            } catch (err) {
                setError(
                    err?.response?.data?.message || "Registration failed"
                );
                toast.update(toastId, {
                    render: "Something went wrong. Please try again.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                console.error("Login error:", err);
            }
        },
    });

    return (
        <div className="d-flex flex-column align-items-center w-100">
            <h3 className="mb-4 text-center fw-bold">Create Your Account ✨</h3>

            <form
                onSubmit={formik.handleSubmit}
                className="w-100"
                style={{ maxWidth: "400px" }}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control rounded-pill ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
                            }`}
                        placeholder="Enter your full name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                </div>

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

                <div className="mb-4 position-relative">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                        Confirm Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showConfirm ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`form-control rounded-pill pe-5 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                ? "is-invalid"
                                : ""
                                }`}
                            placeholder="Re-enter your password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="btn position-absolute end-0 top-0 me-2 border-0 bg-transparent"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className="invalid-feedback d-block">
                            {formik.errors.confirmPassword}
                        </div>
                    )}
                </div>

                {/* Terms */}
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className={`form-check-input ${formik.touched.terms && formik.errors.terms ? "is-invalid" : ""
                            }`}
                        checked={formik.values.terms}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="terms" className="form-check-label small">
                        I agree to the{" "}
                        <a href="#" className="text-primary text-decoration-none">
                            Terms & Conditions
                        </a>
                    </label>
                    {formik.touched.terms && formik.errors.terms && (
                        <div className="invalid-feedback d-block">{formik.errors.terms}</div>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
                >
                    Register
                </button>

                <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-decoration-none fw-semibold text-primary">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
