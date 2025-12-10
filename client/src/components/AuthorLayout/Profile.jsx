import React from "react";
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Button,
    Divider,
} from "@mui/material";

import {
    Edit,
    Twitter,
    Facebook,
    LinkedIn,
} from "@mui/icons-material";

export default function AuthorProfile() {

    const profile = {
        name: "Alex Doe",
        email: "alex.doe@example.com",
        bio:
            "A seasoned writer and digital strategist with a passion for technology and design. " +
            "With over a decade of experience in the tech industry, Alex specializes in breaking down complex topics " +
            "into clear, engaging content.",
    };

    return (
        <Box>

            <Typography fontWeight={800} fontSize={30} mb={0.5}>
                Profile
            </Typography>
            <Typography fontSize={14} color="#6B7280" mb={4}>
                View and manage your personal information.
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "white",
                    mb: 4
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">

                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            sx={{ width: 64, height: 64 }}
                            src="https://i.pravatar.cc/150?img=32"
                        />

                        <Box>
                            <Typography fontWeight={700} fontSize={20}>
                                {profile.name}
                            </Typography>
                            <Typography fontSize={14} color="#6B7280">
                                {profile.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        startIcon={<Edit />}
                        variant="contained"
                        sx={{ textTransform: "none", borderRadius: "8px" }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "white",
                    mb: 4
                }}
            >
                <Typography fontWeight={700} fontSize={18} mb={3}>
                    Personal Information
                </Typography>

                <Box display="flex" gap={6} flexWrap="wrap" mb={3}>
                    <Box width="250px">
                        <Typography fontSize={12} color="#6B7280" mb={0.5}>
                            Full Name
                        </Typography>
                        <Typography fontWeight={600}>{profile.name}</Typography>
                    </Box>

                    <Box width="250px">
                        <Typography fontSize={12} color="#6B7280" mb={0.5}>
                            Email Address
                        </Typography>
                        <Typography fontWeight={600}>{profile.email}</Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography fontSize={12} color="#6B7280" mb={0.5}>
                        Bio
                    </Typography>
                    <Typography lineHeight={1.6}>
                        {profile.bio}
                    </Typography>
                </Box>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "white"
                }}
            >
                <Typography fontWeight={700} fontSize={18} mb={2}>
                    Social Links
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap">
                    <Button
                        startIcon={<Twitter />}
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: "none",
                            borderRadius: "20px",
                            px: 2
                        }}
                    >
                        Twitter
                    </Button>

                    <Button
                        startIcon={<LinkedIn />}
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: "none",
                            borderRadius: "20px",
                            px: 2
                        }}
                    >
                        LinkedIn
                    </Button>

                    <Button
                        startIcon={<Facebook />}
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: "none",
                            borderRadius: "20px",
                            px: 2
                        }}
                    >
                        Facebook
                    </Button>
                </Box>
            </Paper>

        </Box>
    );
}
