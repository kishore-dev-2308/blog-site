import React, { useCallback } from "react";
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
    Avatar
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    PersonAdd as PersonAddIcon,
    Search as SearchIcon,
} from "@mui/icons-material";
import formateDate from "../../utiles/formateDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUserStatus } from "../../services/usersService";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLoader from "../Common/AppLoader";

export default function AdminUsers() {

    const [page, setPage] = useState(1);
    // const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    // const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    const { data: users, isLoading } = useQuery({
        queryKey: ['users', page, debouncedSearch],
        queryFn: () => fetchUsers({ page, search: debouncedSearch }),
        keepPreviousData: true
    });

    const statuschangeMutation = useMutation({
        mutationFn: ({ id, isActive }) => updateUserStatus({ id, isActive }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.refetchQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.error("Error updating user status:", error);
        }
    });

    const handelStatusChange = useCallback((id, isActive) => {
        statuschangeMutation.mutate({ id, isActive });
    }, [statuschangeMutation]);

    const limit = users?.limit || 10;

    if (isLoading) return <AppLoader />;

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography fontSize={26} fontWeight={800}>
                    Manage Users
                </Typography>

                {/* <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    sx={{ borderRadius: "8px", px: 2, py: 1 }}
                >
                    Add New User
                </Button> */}
            </Box>

            <Box mb={3}>
                <TextField
                    fullWidth
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.6 }} />
                    }}
                />
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
                <Box p={2}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Profile</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>IsVerified</TableCell>
                                    <TableCell>Joined Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users?.users?.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Avatar
                                                sx={{ width: 50, height: 50 }}
                                                src={
                                                    user?.profileImage
                                                        ? import.meta.env.VITE_SERVER_MEDIA_URL + user.profileImage
                                                        : undefined
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user?.email}</TableCell>
                                        <TableCell>{user?.role == 2 ? "Author" : "User"}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.isVerified ? "Verified" : "Unverified"}
                                                color={user.isVerified ? "success" : "warning"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{user?.createdAt ? formateDate(user?.createdAt) : "-"}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.isActive ? "Active" : "Inactive"}
                                                color={user.isActive ? "success" : "warning"}
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton onClick={() => handelStatusChange(user.id, !user.isActive)}>
                                                {user.isActive ? <BlockIcon color="warning" titleAccess="Block User" /> : <CheckCircleIcon color="success" titleAccess="Unblock User" />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>


                    <Box display="flex" justifyContent="space-between" alignItems="center" pt={2}>
                        <Typography fontSize={13} color="#757575">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, users?.total || 0)} of {users?.total || 0} results
                        </Typography>

                        <Pagination
                            count={users?.pages || 1}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            shape="rounded"
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
