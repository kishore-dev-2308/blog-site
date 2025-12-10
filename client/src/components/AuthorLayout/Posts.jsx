import React from 'react'
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

function Posts() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const blogData = [
        { title: "The Future of AI in Web Development", status: "Published", date: "Oct 15, 2023", views: "1.2k" },
        { title: "A Deep Dive into React Hooks", status: "Published", date: "Sep 28, 2023", views: "3.5k" },
        { title: "Getting Started with Tailwind CSS", status: "Draft", date: "Sep 05, 2023", views: "N/A" },
        { title: "10 Tips for Writing Clean Code", status: "Published", date: "Aug 21, 2023", views: "5.8k" },
    ];
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

                <Button startIcon={<AddBoxOutlined />} variant="contained">
                    Create New Blog
                </Button>
            </Box>

            <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} mb={4}>
                <TextField fullWidth size="small" placeholder="Search..." />
                <Select fullWidth size="small" defaultValue="All">
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
                                <TableCell>Views</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogData.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                        <Chip size="small" label={row.status} color={row.status === "Published" ? "success" : "warning"} />
                                    </TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.views}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small"><Visibility /></IconButton>
                                        <IconButton size="small"><Edit /></IconButton>
                                        <IconButton size="small" color="error"><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>
        </>
    )
}

export default Posts