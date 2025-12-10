import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";

import {
  TrendingUp,
  VisibilityOutlined,
  ArticleOutlined,
  AddBoxOutlined,
} from "@mui/icons-material";

export default function AuthorDashboard() {
  const stats = [
    {
      label: "Total Views",
      value: "12.5K",
      change: "+20%",
      icon: <VisibilityOutlined />,
      color: "#2563EB",
    },
    {
      label: "Published Posts",
      value: "48",
      change: "+3 new",
      icon: <ArticleOutlined />,
      color: "#10B981",
    },
    {
      label: "Profile Visits",
      value: "7.9K",
      change: "+15%",
      icon: <TrendingUp />,
      color: "#EC4899",
    },
  ];

  const recentPosts = [
    {
      title: "The Future of AI in Web Development",
      views: "1,250",
      date: "Oct 15, 2024",
    },
    {
      title: "Using React Server Components",
      views: "980",
      date: "Nov 10, 2024",
    },
    {
      title: "Node.js Performance Tips",
      views: "720",
      date: "Dec 21, 2024",
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography fontWeight={800} fontSize={32}>
            Dashboard
          </Typography>
          <Typography fontSize={14} color="#6B7280">
            Track your performance and recent publishing activity.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddBoxOutlined />}
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Create New Blog
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                bgcolor: "#fff",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={600}>{item.label}</Typography>

                <Box
                  sx={{
                    bgcolor: item.color + "10",
                    p: 1.2,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Box>
              </Box>

              <Typography fontSize={30} fontWeight={800} mt={1}>
                {item.value}
              </Typography>

              <Typography fontSize={13} color={item.color}>
                {item.change}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          bgcolor: "#fff",
        }}
      >
        <Typography fontWeight={700} fontSize={18} mb={2}>
          Recent Posts
        </Typography>

        {recentPosts.map((post, index) => (
          <Box key={index}>
            <Box display="flex" justifyContent="space-between" mb={1.5}>
              <Box>
                <Typography fontWeight={600} fontSize={15}>
                  {post.title}
                </Typography>
                <Typography fontSize={12} color="#6B7280">
                  Published on {post.date}
                </Typography>
              </Box>

              <Typography fontWeight={700}>{post.views} views</Typography>
            </Box>

            {index < recentPosts.length - 1 && <Divider sx={{ my: 1.8 }} />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
