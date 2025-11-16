import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { Email, Call, LocationOn } from "@mui/icons-material";

const Contact = () => {
    return (
        <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 10 } }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box textAlign="center" mb={6}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: "#111827",
                            mb: 1,
                            fontSize: { xs: "1.8rem", md: "2.2rem" },
                        }}
                    >
                        Get in Touch
                    </Typography>
                    <Typography
                        sx={{
                            color: "#6b7280",
                            maxWidth: "600px",
                            mx: "auto",
                            lineHeight: 1.6,
                            fontSize: "1rem",
                        }}
                    >
                        Have a question or a project in mind? Drop a line. We'd love to
                        hear from you and we'll get back to you as soon as possible.
                    </Typography>
                </Box>

                {/* Layout */}
                <Grid
                    container
                    spacing={5}
                    alignItems="flex-start"
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                >
                    {/* Left Form Section */}
                    <Grid item size={{ xs: 12, md: 7 }}>
                        <form>
                            <Grid container spacing={3}>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            fontWeight: 600,
                                            color: "#111827",
                                            mb: 1,
                                        }}
                                    >
                                        Your Name
                                    </Typography>
                                    <TextField
                                        placeholder="Enter your name"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                borderRadius: "10px",
                                                backgroundColor: "#f9fafb",
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            fontWeight: 600,
                                            color: "#111827",
                                            mb: 1,
                                        }}
                                    >
                                        Your Email
                                    </Typography>
                                    <TextField
                                        placeholder="Enter your email address"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                borderRadius: "10px",
                                                backgroundColor: "#f9fafb",
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid item size={{ xs: 12 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            fontWeight: 600,
                                            color: "#111827",
                                            mb: 1,
                                        }}
                                    >
                                        Message
                                    </Typography>
                                    <TextField
                                        placeholder="Type your message here..."
                                        fullWidth
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                borderRadius: "10px",
                                                backgroundColor: "#f9fafb",
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid item size={{ xs: 12 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#3b82f6",
                                            textTransform: "none",
                                            borderRadius: "9999px",
                                            px: 4,
                                            py: 1.2,
                                            fontWeight: 600,
                                            width: { xs: "100%", sm: "auto" },
                                            "&:hover": {
                                                backgroundColor: "#2563eb",
                                            },
                                        }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>

                    {/* Right Info Section */}
                    <Grid item size={{ xs: 12, md: 5 }}>
                        <Box display="flex" flexDirection="column" gap={4}>
                            {/* Email */}
                            <Box display="flex" alignItems="flex-start" gap={2}>
                                <Box
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: "50%",
                                        backgroundColor: "#eff6ff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Email sx={{ color: "#3b82f6" }} />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            color: "#111827",
                                        }}
                                    >
                                        Email
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            color: "#6b7280",
                                            mb: 0.5,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        Our inbox is always open. Whether you have a question or
                                        just want to say hi, we'll get back to you.
                                    </Typography>
                                    <Typography>
                                        <a
                                            href="mailto:hello@yourblog.com"
                                            style={{
                                                color: "#3b82f6",
                                                textDecoration: "none",
                                                fontWeight: 600,
                                            }}
                                        >
                                            hello@yourblog.com
                                        </a>
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Phone */}
                            <Box display="flex" alignItems="flex-start" gap={2}>
                                <Box
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: "50%",
                                        backgroundColor: "#eff6ff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Call sx={{ color: "#3b82f6" }} />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            color: "#111827",
                                        }}
                                    >
                                        Phone
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            color: "#6b7280",
                                            mb: 0.5,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        Mon–Fri from 9am to 5pm. Reach out anytime.
                                    </Typography>
                                    <Typography>
                                        <a
                                            href="tel:+15551234567"
                                            style={{
                                                color: "#3b82f6",
                                                textDecoration: "none",
                                                fontWeight: 600,
                                            }}
                                        >
                                            +1 (555) 123-4567
                                        </a>
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Location */}
                            <Box display="flex" alignItems="flex-start" gap={2}>
                                <Box
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: "50%",
                                        backgroundColor: "#eff6ff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <LocationOn sx={{ color: "#3b82f6" }} />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            color: "#111827",
                                        }}
                                    >
                                        Location
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            color: "#6b7280",
                                            mb: 0.5,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        Come say hello at our office headquarters.
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        City, Country
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;
