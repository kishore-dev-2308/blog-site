import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Select,
    MenuItem,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    useMediaQuery
} from "@mui/material";

import {
    AddBoxOutlined,
    Visibility,
    Edit,
    Delete,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "../../services/blogService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import formateDate from "../../utiles/formateDate";
import Swal from "sweetalert2";
import AppLoader from "../Common/AppLoader";

function Posts() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const queryClient = useQueryClient();
    const navigate = useNavigate();   // FIXED

    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const { data: blogs, isLoading } = useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
        staleTime: 5 * 60 * 1000,
    });

    const handleDelete = async (blogId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteBlogMutation.mutateAsync(blogId);
            } catch (error) {
                toast.error("Failed to delete blog");
            }
        }
    };


    const deleteBlogMutation = useMutation({
        mutationFn: (blogId) => deleteBlog(blogId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (error) => {
            console.error("Error deleting blog:", error);
        }
    });

    if (isLoading) return <AppLoader />;

    const filteredBlogs = blogs?.filter((blog) => {
        if (filter !== "All" && blog.status !== filter) return false;
        if (search && !blog.title.toLowerCase().includes(search.toLowerCase()))
            return false;
        return true;
    });

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3} gap={2}>
                <Box>
                    <Typography fontWeight={800} fontSize={isMobile ? 22 : 32}>
                        Manage Your Posts
                    </Typography>
                    <Typography fontSize={14} color="#757575">
                        View and update your posts
                    </Typography>
                </Box>

                <Button
                    startIcon={<AddBoxOutlined />}
                    variant="contained"
                    onClick={() => navigate("/author/posts/create")}
                >
                    Create New Blog
                </Button>
            </Box>

            <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} mb={4}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    fullWidth
                    size="small"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                </Select>
            </Box>

            <Paper>
                <Box sx={{ overflowX: "auto" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredBlogs?.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={row.isPublished ? "Published" : "Draft"}
                                            color={row.isPublished ? "success" : "warning"}
                                        />
                                    </TableCell>
                                    <TableCell>{formateDate(row.createdAt)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => {
                                            navigate(`/author/posts/view/${row.id}`)
                                        }}>
                                            <Visibility />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                navigate(`/author/posts/edit/${row.id}`)
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={
                                            () => handleDelete(row.id)
                                        }>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>
        </>
    );
}

export default Posts;
