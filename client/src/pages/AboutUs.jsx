import React from "react";
import {
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    Avatar,
    Box,
} from "@mui/material";

const AboutUs = () => {
    const team = [
        {
            name: "Kishore Kumar",
            role: "Founder & Backend Developer",
            img: "https://i.pravatar.cc/150?img=3",
        },
        {
            name: "Aarav Mehta",
            role: "Frontend Engineer",
            img: "https://i.pravatar.cc/150?img=5",
        },
        {
            name: "Sneha Iyer",
            role: "Content Strategist",
            img: "https://i.pravatar.cc/150?img=8",
        },
    ];

    return (
        <Box sx={{ backgroundColor: "#FFF", pt: 10 }}>
            {/* Hero Section */}
            <Box
                className="text-center py-5 border-bottom"
                sx={{
                    // background: "#f8f9fa",
                    py: 8,
                }}
            >
                <Container>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        The Story Behind Our Words
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
                        At TechStream, we simplify technology. Our mission is to deliver
                        reliable, insightful content that keeps you informed and inspired.
                    </Typography>
                </Container>
            </Box>

            {/* Mission Section */}
            <Container sx={{ py: 10 }}>
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box className="text-center text-md-start">
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                We aim to bridge the gap between developers and innovation by
                                curating practical tutorials, insights, and stories that empower
                                your tech journey.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} className="text-center">
                        <Box
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "#137fec20",
                                borderRadius: "50%",
                                width: 200,
                                height: 200,
                            }}
                        >
                            <i className="bi bi-rocket-takeoff fs-1 text-primary"></i>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Team Section */}
            <Box className="bg-light py-5 border-top border-bottom">
                <Container>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                    >
                        Meet the Team
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        mb={5}
                    >
                        The passionate minds behind TechStream.
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {team.map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    elevation={2}
                                    className="text-center h-100 border-0 shadow-sm"
                                >
                                    <CardContent>
                                        <Avatar
                                            src={member.img}
                                            alt={member.name}
                                            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                                        />
                                        <Typography variant="h6" fontWeight="bold">
                                            {member.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {member.role}
                                        </Typography>
                                        <div className="d-flex justify-content-center gap-3 mt-3">
                                            <i className="bi bi-twitter text-primary"></i>
                                            <i className="bi bi-linkedin text-primary"></i>
                                            <i className="bi bi-github text-dark"></i>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Container sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Join Our Community
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 600, mx: "auto", mb: 3 }}
                >
                    Stay updated with the latest articles and insights in tech.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#137fec",
                        "&:hover": { bgcolor: "#0e63b3" },
                        px: 4,
                        py: 1,
                        fontWeight: "bold",
                    }}
                >
                    Read The Blog
                </Button>
            </Container>
        </Box>
    );
};

export default AboutUs;
