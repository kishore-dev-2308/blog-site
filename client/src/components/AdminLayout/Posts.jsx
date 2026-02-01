import React, { useState, useEffect } from "react";
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
    Pagination
} from "@mui/material";
import {
    Visibility,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Edit,
    Delete,
    AddBoxOutlined,
} from "@mui/icons-material";

import { fetchBlogs } from "../../services/blogService";
import { useMutation, useQuery } from "@tanstack/react-query";
import formateDate from "../../utiles/formateDate";
import { useNavigate } from "react-router-dom";
import AppLoader from "../Common/AppLoader";

export default function AdminPosts() {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    const { data: blogs, isLoading } = useQuery({
        queryKey: ["blogs", page, debouncedSearch],
        queryFn: () => fetchBlogs({ page, search: debouncedSearch }),
        keepPreviousData: true
    });

    const deleteBlogMutation = useMutation({
        mutationFn: (id) => deleteBlog(id),
        onSuccess: () => {
            toast.success("Blog deleted successfully");
            queryClient.invalidateQueries(["blogs"]);
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        });

        if (result.isConfirmed) {
            deleteBlogMutation.mutate(id);
        }
    };

    const limit = blogs?.limit || 10;

    if (isLoading) return <AppLoader />;
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography fontSize={26} fontWeight={800}>
                    Manage Posts
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddBoxOutlined />}
                    onClick={() => navigate("/admin/posts/create")}
                >
                    Create Blog
                </Button>
            </Box>
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Select
                    size="small"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setPage(1);
                    }}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                </Select>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
                <Box p={2}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {blogs?.blogs?.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell>{blog.title}</TableCell>

                                        <TableCell>
                                            <Chip
                                                label={blog.isPublished ? "Published" : "Draft"}
                                                color={blog.isPublished ? "success" : "warning"}
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell>{blog.author?.name}</TableCell>
                                        <TableCell>{formateDate(blog.createdAt)}</TableCell>

                                        <TableCell align="right">
                                            <IconButton onClick={() => navigate(`/admin/posts/view/${blog.id}`)}>
                                                <Visibility />
                                            </IconButton>
                                            <IconButton onClick={() => navigate(`/admin/posts/edit/${blog.id}`)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(blog.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>


                    <Box display="flex" justifyContent="space-between" alignItems="center" pt={2}>
                        <Typography fontSize={13} color="#757575">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, blogs?.total || 0)} of {blogs?.total || 0} results
                        </Typography>

                        <Pagination
                            count={blogs?.pages || 1}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            shape="rounded"
                        />
                    </Box>
                </Box>
            </Paper>
        </>
    );
}
