import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiPrivate from "../../api/apiPrivate";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            // const toastId = toast.loading("processing...");
            try {
                await apiPrivate.post(
                    `/auth/verify-email`,
                    { token }
                );

                setStatus("success");
                setMessage("Your email has been verified successfully.");
            } catch (error) {
                setStatus("error");
                setMessage(
                    error?.response?.data?.message ||
                    "Invalid or expired verification link."
                );
            }
        };

        if (token) verifyEmail();
    }, [token]);

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                {status === "loading" && (
                    <>
                        <h2 style={styles.title}>Verifying your email…</h2>
                        <p style={styles.text}>Please wait a moment.</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h2 style={styles.title}>Email Verified ✅</h2>
                        <p style={styles.text}>{message}</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h2 style={styles.title}>Verification Failed ❌</h2>
                        <p style={styles.text}>{message}</p>
                    </>
                )}

                {status !== "loading" && (
                    <div style={styles.links}>
                        <Link to="/" style={styles.link}>
                            Go to Home
                        </Link>
                        <Link to="/login" style={styles.link}>
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        padding: "20px",
    },
    card: {
        maxWidth: "420px",
        width: "100%",
        background: "#ffffff",
        borderRadius: "8px",
        padding: "32px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    },
    title: {
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "12px",
    },
    text: {
        fontSize: "15px",
        color: "#555",
        marginBottom: "16px",
    },
    links: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
    },
    link: {
        color: "#1976d2",
        textDecoration: "none",
        fontWeight: "500",
    },
};

export default VerifyEmail;
