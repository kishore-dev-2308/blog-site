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
  TableBody,
} from "@mui/material";
import { fetchRecentBlogs } from "../../services/blogService";
import { useQuery } from "@tanstack/react-query";
import formatDate from "../../utiles/formateDate";
import apiPrivate from "../../api/apiPrivate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AppLoader from "../Common/AppLoader";

export default function AdminDashboard() {
  const { user } = useSelector((s) => s.auth);

  const [stats, setStats] = useState([
    { label: "Total Users", value: 0 },
    { label: "Total Blogs", value: 0 },
    { label: "Total Categories", value: 0 },
  ]);

  const { data: recentblogs, isLoading } = useQuery({
    queryKey: ["recentblogs"],
    queryFn: fetchRecentBlogs,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
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

  if (isLoading) return <AppLoader />;

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
