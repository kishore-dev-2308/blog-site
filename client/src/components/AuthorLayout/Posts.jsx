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
    AddBoxOutlined,
    Visibility,
    Edit,
    Delete,
} from "@mui/icons-material";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs, deleteBlog } from "../../services/blogService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AppLoader from "../Common/AppLoader";
import formateDate from "../../utiles/formateDate";

function Posts() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    const { data: blogs, isLoading } = useQuery({
        queryKey: ["blogs", page, debouncedSearch, filter],
        queryFn: () => fetchBlogs({ page, search: debouncedSearch, filter }),
        keepPreviousData: true,
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

    if (isLoading) return <AppLoader />;

    return (
        <>
            <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography fontSize={28} fontWeight={700}>
                    Manage Your Posts
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddBoxOutlined />}
                    onClick={() => navigate("/author/posts/create")}
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

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Status</TableCell>
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

                                <TableCell>{formateDate(blog.createdAt)}</TableCell>

                                <TableCell align="right">
                                    <IconButton onClick={() => navigate(`/author/posts/view/${blog.id}`)}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton onClick={() => navigate(`/author/posts/edit/${blog.id}`)}>
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

            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Pagination
                    count={blogs?.pages || 1}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    shape="rounded"
                />
            </Box>
        </>
    );
}

export default Posts;
