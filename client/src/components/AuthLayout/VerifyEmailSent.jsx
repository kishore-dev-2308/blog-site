import { Link, useSearchParams } from "react-router-dom";

const VerifyEmailSent = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Verify your email</h2>

                <p style={styles.text}>
                    We’ve sent a verification email
                    {email && (
                        <>
                            {" "}to <strong>{email}</strong>
                        </>
                    )}
                    .
                </p>

                <p style={styles.text}>
                    Please check your inbox and click the verification link to
                    activate your account.
                </p>

                <div style={styles.links}>
                    <Link to="/" style={styles.link}>
                        Go to Home
                    </Link>

                    <Link to="/login" style={styles.link}>
                        Go to Login
                    </Link>
                </div>
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
        marginBottom: "12px",
        fontSize: "22px",
        fontWeight: "600",
    },
    text: {
        fontSize: "15px",
        color: "#555",
        marginBottom: "12px",
    },
    links: {
        marginTop: "24px",
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

export default VerifyEmailSent;
