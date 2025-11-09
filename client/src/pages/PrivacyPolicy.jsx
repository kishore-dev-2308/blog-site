import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";

const PrivacyPolicy = () => {
    return (
        <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 10 } }}>
            <Container maxWidth="md">
                {/* Header */}
                <Box textAlign="center" mb={6}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: "#111827",
                            mb: 2,
                            fontSize: { xs: "1.8rem", md: "2.2rem" },
                        }}
                    >
                        Privacy Policy
                    </Typography>
                    <Typography
                        sx={{
                            color: "#6b7280",
                            fontSize: "1rem",
                            maxWidth: "600px",
                            mx: "auto",
                            lineHeight: 1.6,
                        }}
                    >
                        Your privacy is important to us. This Privacy Policy explains how we
                        collect, use, and protect your information when you use our website.
                    </Typography>
                </Box>

                {/* Content */}
                <Box sx={{ color: "#374151", lineHeight: 1.8 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        1. Information We Collect
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        We may collect personal information such as your name, email address,
                        and any other details you provide when registering, subscribing, or
                        contacting us. Additionally, we collect non-personal information like
                        browser type, IP address, and usage data for analytics purposes.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        2. How We Use Your Information
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        We use your information to provide, maintain, and improve our
                        services, respond to inquiries, and send you relevant updates. We do
                        not sell or rent your information to third parties.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        3. Cookies
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        We use cookies to enhance your browsing experience. Cookies help us
                        remember your preferences and understand how you use our website. You
                        can disable cookies in your browser settings at any time.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        4. Data Security
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        We implement industry-standard security measures to protect your
                        personal information. However, please note that no method of data
                        transmission over the internet is completely secure.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        5. Third-Party Services
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Our website may contain links to third-party sites. We are not
                        responsible for the privacy practices or content of those websites.
                        We encourage you to review their privacy policies.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        6. Your Rights
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        You have the right to access, correct, or delete your personal data.
                        If you wish to exercise these rights, please contact us at{" "}
                        <strong>privacy@yourblog.com</strong>.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        7. Changes to This Policy
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        We may update this Privacy Policy periodically. Any changes will be
                        posted on this page with an updated effective date.
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Contact Us
                    </Typography>
                    <Typography>
                        If you have any questions about this Privacy Policy, please contact
                        us at{" "}
                        <a
                            href="mailto:privacy@yourblog.com"
                            style={{ color: "#3b82f6", fontWeight: 600 }}
                        >
                            privacy@yourblog.com
                        </a>
                        .
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;
