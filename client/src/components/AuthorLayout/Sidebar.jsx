import React from "react";
import {
    Box,
    Avatar,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";

import {
    DashboardOutlined,
    ArticleOutlined,
    PersonOutline,
    Logout,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, setActive }) {
    const navigate = useNavigate();

    const menus = [
        { key: "dashboard", label: "Dashboard", url: "/author", icon: <DashboardOutlined /> },
        { key: "posts", label: "Posts", url: "/author/posts", icon: <ArticleOutlined /> },
        { key: "profile", label: "Profile", url: "/author/profile", icon: <PersonOutline /> },
    ];

    return (
        <Box
            p={2}
            width={260}
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            bgcolor="#fff"
        >
            <Box>

                <Box display="flex" alignItems="center" gap={1.5} mb={4}>
                    <Avatar sx={{ bgcolor: "#E5F0FF", width: 40, height: 40 }}>
                        <Typography fontWeight={700} fontSize={14} color="#1A73E8">
                            B
                        </Typography>
                    </Avatar>

                    <Typography fontSize={20} fontWeight={700}>
                        BlogFlow
                    </Typography>
                </Box>

                <List>
                    {menus.map(menu => {
                        const isActive = location.pathname === menu.url;
                        return (
                            <ListItemButton
                                key={menu.key}
                                onClick={() => {
                                    setActive(menu.key);
                                    navigate(menu.url);
                                }}
                                sx={{
                                    mb: 0.6,
                                    py: 1.25,
                                    borderRadius: "10px",
                                    bgcolor: isActive ? "#E9F3FF" : "transparent",
                                    color: isActive ? "#1A73E8" : "#424242",
                                    "&:hover": { bgcolor: "#E9F3FF" }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 40,
                                        color: isActive ? "#1A73E8" : "#424242"
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={menu.label}
                                    primaryTypographyProps={{
                                        fontSize: 15,
                                        fontWeight: isActive ? 700 : 500
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Box>

            <Box px={2} pb={1}>
                <Button
                    startIcon={<Logout />}
                    fullWidth
                    sx={{
                        bgcolor: "#FFECEC",
                        color: "#D64545",
                        fontWeight: 700,
                        py: 1,
                        borderRadius: "10px",
                        "&:hover": { bgcolor: "#FFD9D9" }
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
}
