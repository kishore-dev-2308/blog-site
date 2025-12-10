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
    Search as SearchIcon,
    PostAdd as PostAddIcon,
} from "@mui/icons-material";

export default function AdminPosts() {

    const blogs = [
        {
            title: "The Future of AI in Web Development",
            author: "John Doe",
            category: "Technology",
            status: "Published",
            date: "Jan 15, 2024",
            views: "1,250",
            avatar: "https://i.pravatar.cc/40?img=1"
        },
        {
            title: "Using React Server Components",
            author: "Jane Smith",
            category: "UI/UX",
            status: "Draft",
            date: "Jan 10, 2024",
            views: "-",
            avatar: "https://i.pravatar.cc/40?img=2"
        },
        {
            title: "Node.js Performance Tips",
            author: "Mike Johnson",
            category: "Backend",
            status: "Published",
            date: "Jan 08, 2024",
            views: "980",
            avatar: "https://i.pravatar.cc/40?img=3"
        },
    ];

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography fontSize={26} fontWeight={800}>
                    Manage Blogs
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<PostAddIcon />}
                    sx={{ borderRadius: "8px", px: 2, py: 1 }}
                >
                    Add New Blog
                </Button>
            </Box>

            <Box mb={3}>
                <TextField
                    fullWidth
                    placeholder="Search blogs by title or category..."
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.6 }} />
                    }}
                />
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
                <Box p={2}>

                    <Box display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr 80px" pb={1}>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Title</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Author</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Category</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Date Published</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Actions</Typography>
                    </Box>

                    <Divider sx={{ mb: 1 }} />

                    {blogs.map((blog, i) => (
                        <Box
                            key={i}
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
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <Avatar src={blog.avatar} />
                                <Box>
                                    <Typography fontWeight={600}>{blog.title}</Typography>
                                </Box>
                            </Box>

                            <Typography fontSize={14} color="#444">
                                {blog.author}
                            </Typography>

                            <Chip
                                label={blog.category}
                                size="small"
                                sx={{
                                    bgcolor: "#F0F7FF",
                                    color: "#1A73E8",
                                    fontWeight: 600,
                                }}
                            />

                            <Typography fontSize={14} color="#555">
                                {blog.date}
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
                            Showing 1 to 3 of 18 results
                        </Typography>

                        <Pagination count={6} page={1} shape="rounded" />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
