import React, { useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    Stack,
    CircularProgress,
    Pagination,
    Alert,
    TextField,
    MenuItem,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiPrivate from "../../api/apiPrivate";
import AppLoader from "../Common/AppLoader";

const PAGE_SIZE = 5;

const fetchAuthorRequests = async ({ page, status }) => {
    const res = await apiPrivate.get("/author-requests", {
        params: {
            page,
            limit: PAGE_SIZE,
            status,
        },
    });
    return res.data;
};

const AuthorRequests = () => {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("ALL");

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["author-requests", page, status],
        queryFn: () => fetchAuthorRequests({ page, status }),
        keepPreviousData: true,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            apiPrivate.post(`/author-requests/${id}`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries(["author-requests"]);
            toast.success("Author request approved");
        },
        onError: () => {
            toast.error("Failed to approve author request");
        }
    });

    if (isLoading) return <AppLoader />;

    if (isError) {
        return <Alert severity="error">Failed to load author requests</Alert>;
    }

    const requests = data?.requests || [];
    const totalPages = data?.totalPages || 0;

    return (
        <Box maxWidth={1100} mx="auto" mt={4}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Author Requests
            </Typography>

            <Stack direction="row" spacing={2} mb={3}>
                <TextField
                    select
                    label="Status"
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        setPage(1);
                    }}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="APPROVED">Approved</MenuItem>
                    <MenuItem value="REJECTED">Rejected</MenuItem>
                </TextField>
            </Stack>

            {requests.length === 0 ? (
                <Alert severity="info">No author requests found.</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Reason</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell>{req.user.name}</TableCell>
                                    <TableCell>{req.user.email}</TableCell>
                                    <TableCell sx={{ maxWidth: 300 }}>
                                        {req.reason}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={req.status}
                                            size="small"
                                            color={
                                                req.status === "PENDING"
                                                    ? "warning"
                                                    : req.status === "APPROVED"
                                                        ? "success"
                                                        : "error"
                                            }
                                        />
                                    </TableCell>

                                    <TableCell align="right">
                                        {req.status === "PENDING" && (
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                justifyContent="flex-end"
                                            >
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => updateStatusMutation.mutate({ id: req.id, status: "APPROVED" })}
                                                    disabled={updateStatusMutation.isLoading}
                                                >
                                                    Approve
                                                </Button>

                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => updateStatusMutation.mutate({ id: req.id, status: "REJECTED" })}
                                                    disabled={updateStatusMutation.isLoading}
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};

export default AuthorRequests;
