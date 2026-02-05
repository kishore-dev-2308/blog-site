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
  Pagination,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  AddBoxOutlined,
  Star,
  StarBorder,
} from "@mui/icons-material";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchBlogs,
  deleteBlog,
  toggleFeaturedBlog,
} from "../../services/blogService";
import formateDate from "../../utiles/formateDate";
import AppLoader from "../Common/AppLoader";

export default function AdminPosts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loadingFeaturedId, setLoadingFeaturedId] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", page, debouncedSearch],
    queryFn: () => fetchBlogs({ page, search: debouncedSearch }),
    keepPreviousData: true,
  });

  const featureBlogMutation = useMutation({
    mutationFn: async ({ id, featured }) => {
      setLoadingFeaturedId(id);
      await toggleFeaturedBlog(id, featured);
    },
    onSuccess: () => {
      toast.success("Featured status updated");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      toast.error("Failed to update featured status");
    },
    onSettled: () => {
      setLoadingFeaturedId(null);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      toast.error("Failed to delete blog");
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      deleteBlogMutation.mutate(id);
    }
  };

  if (isLoading) return <AppLoader />;

  const limit = blogs?.limit || 10;

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={3}>
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

      <Box mb={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Paper sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
        <Box p={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Featured</TableCell>
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

                  <TableCell>
                    <IconButton
                      onClick={() =>
                        featureBlogMutation.mutate({
                          id: blog.id,
                          featured: !blog.isFeatured,
                        })
                      }
                      disabled={loadingFeaturedId === blog.id}
                      color="primary"
                    >
                      {loadingFeaturedId === blog.id ? (
                        <CircularProgress size={18} />
                      ) : blog.isFeatured ? (
                        <Star />
                      ) : (
                        <StarBorder />
                      )}
                    </IconButton>
                  </TableCell>

                  <TableCell>{blog.author?.name || "-"}</TableCell>
                  <TableCell>{formateDate(blog.createdAt)}</TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() => navigate(`/admin/posts/view/${blog.id}`)}
                    >
                      <Visibility />
                    </IconButton>

                    <IconButton
                      onClick={() => navigate(`/admin/posts/edit/${blog.id}`)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={2}
          >
            <Typography fontSize={13} color="#757575">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, blogs?.total || 0)} of {blogs?.total || 0}{" "}
              results
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
