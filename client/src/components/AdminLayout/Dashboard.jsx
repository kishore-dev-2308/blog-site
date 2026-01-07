import React, { useCallback, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody
} from "@mui/material";
import { fetchRecentBlogs } from "../../services/blogService";
import { useQuery } from "@tanstack/react-query";
import formatDate from "../../utiles/formateDate";
import apiPrivate from "../../api/apiPrivate";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AdminDashboard() {
    const { isAuthenticated, user } = useSelector((s) => s.auth);

    const [stats, setStats] = useState([
        { label: "Total Users", value: 0 },
        { label: "Total Blogs", value: 0 },
        { label: "Total Categories", value: 0 },
    ]);

    const { data: recentblogs, isLoading } = useQuery({
        queryKey: ["recentblogs"],
        queryFn: fetchRecentBlogs,
        staleTime: 5 * 60 * 1000,
    });

    const getDashboardStats = useCallback(async () => {
        try {
            const response = await apiPrivate.get("/dashboard/stats");
            if (response.status != 200) {
                console.error("Failed to fetch dashboard stats");
                return;
            }
            setStats(response.data.stats);
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        }
    }, [user]);

    useEffect(() => {
        getDashboardStats();
    }, [getDashboardStats]);

    return (
        <Box>
            <Typography fontWeight={800} fontSize={28} mb={1}>
                Dashboard
            </Typography>
            <Typography fontSize={14} color="#888" mb={4}>
                Track your performance, users, blogs & categories.
            </Typography>

            <Grid container spacing={3} mb={4}>
                {stats.map((s, i) => (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: "1px solid #E5E7EB",
                                bgcolor: "#fff",
                            }}
                        >
                            <Typography fontSize={14} color="#666">
                                {s.label}
                            </Typography>
                            <Typography fontSize={30} fontWeight={800}>
                                {s.value}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    bgcolor: "#fff",
                    p: 3,
                    mb: 4,
                }}
            >
                <Typography fontWeight={700} mb={0.3}>
                    User Signups
                </Typography>
                <Typography fontSize={13} color="#666" mb={2}>
                    Last 30 Days
                </Typography>

                <Typography fontSize={30} fontWeight={800}>
                    +50 this month{" "}
                    <span style={{ color: "#22c55e", fontSize: 14, fontWeight: 600 }}>
                        +5.2%
                    </span>
                </Typography>

                <Box display="flex" gap={2} alignItems="flex-end" mt={4}>
                    <Box sx={{ width: 55, height: 30, bgcolor: "#E2E8F0", borderRadius: 2 }} />
                    <Box sx={{ width: 55, height: 55, bgcolor: "#E2E8F0", borderRadius: 2 }} />
                    <Box sx={{ width: 55, height: 80, bgcolor: "#E2E8F0", borderRadius: 2 }} />
                    <Box sx={{ width: 55, height: 95, bgcolor: "#3B82F6", borderRadius: 2 }} />
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    color="#444"
                    mt={1}
                    fontSize={13}
                >
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span style={{ fontWeight: 700 }}>Week 4</span>
                </Box>
            </Paper> */}

            <Typography fontWeight={800} mb={1}>
                Recent Blog Posts
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    bgcolor: "#fff",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Date Published</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {recentblogs?.map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.author.name}</TableCell>
                                <TableCell>{row.category.name}</TableCell>
                                <TableCell>{formatDate(row.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </Box>
    );
}
