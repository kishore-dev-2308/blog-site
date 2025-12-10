import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Avatar,
    Chip,
    IconButton,
    Pagination,
    Paper,
} from "@mui/material";

import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    PersonAdd as PersonAddIcon,
    Search as SearchIcon,
} from "@mui/icons-material";

export default function AdminUsers() {

    const users = [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            status: "Active",
            date: "Jan 15, 2024",
            avatar: "https://i.pravatar.cc/40?img=1"
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Editor",
            status: "Active",
            date: "Jan 12, 2024",
            avatar: "https://i.pravatar.cc/40?img=2"
        },
        {
            name: "Mike Johnson",
            email: "mike.j@example.com",
            role: "Author",
            status: "Inactive",
            date: "Jan 10, 2024",
            avatar: "https://i.pravatar.cc/40?img=3"
        },
        {
            name: "Sarah Davis",
            email: "sarah.davis@example.com",
            role: "Subscriber",
            status: "Active",
            date: "Jan 08, 2024",
            avatar: "https://i.pravatar.cc/40?img=4"
        },
    ];

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography fontSize={26} fontWeight={800}>
                    Manage Users
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    sx={{ borderRadius: "8px", px: 2, py: 1 }}
                >
                    Add New User
                </Button>
            </Box>

            <Box mb={3}>
                <TextField
                    fullWidth
                    placeholder="Search users by name or email..."
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.6 }} />
                    }}
                />
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
                <Box p={2}>
                    <Box display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr 80px" pb={1}>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>User</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Role</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Status</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Created Date</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Actions</Typography>
                    </Box>

                    <Divider sx={{ mb: 1 }} />

                    {users.map((user, index) => (
                        <Box
                            key={index}
                            display="grid"
                            gridTemplateColumns="2fr 1fr 1fr 1fr 80px"
                            alignItems="center"
                            py={1.5}
                            sx={{
                                "&:not(:last-child)": {
                                    borderBottom: "1px solid #f3f4f6"
                                }
                            }}
                        >
                            <Box display="flex" gap={1.5} alignItems="center">
                                <Avatar src={user.avatar} />
                                <Box>
                                    <Typography fontWeight={600}>{user.name}</Typography>
                                    <Typography fontSize={13} color="#666">
                                        {user.email}
                                    </Typography>
                                </Box>
                            </Box>

                            <Chip
                                label={user.role}
                                size="small"
                                sx={{
                                    bgcolor:
                                        user.role === "Admin" ? "#DDEBFF" :
                                        user.role === "Editor" ? "#FFF3D2" :
                                        "#EFEFEF",
                                    color:
                                        user.role === "Admin" ? "#1A73E8" :
                                        user.role === "Editor" ? "#946200" :
                                        "#444",
                                    fontWeight: 600,
                                }}
                            />

                            <Chip
                                label={user.status}
                                size="small"
                                sx={{
                                    bgcolor: user.status === "Active" ? "#E8FDE6" : "#FFE3E3",
                                    color: user.status === "Active" ? "#1D7E2A" : "#AD2A2A",
                                    fontWeight: 600
                                }}
                            />

                            <Typography fontSize={14} color="#555">
                                {user.date}
                            </Typography>

                            <Box display="flex" gap={1}>
                                <IconButton size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                    <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}

                    <Box display="flex" justifyContent="space-between" alignItems="center" pt={2}>
                        <Typography fontSize={13} color="#757575">
                            Showing 1 to 4 of 20 results
                        </Typography>

                        <Pagination count={5} page={1} shape="rounded" />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
