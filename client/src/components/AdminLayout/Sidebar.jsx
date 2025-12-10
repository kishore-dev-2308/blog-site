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
    GroupOutlined,
    ArticleOutlined,
    AssessmentOutlined,
    SettingsOutlined,
    Logout,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ active, setActive }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        { key: "dashboard", label: "Dashboard", url: "/admin", icon: <DashboardOutlined /> },
        { key: "users", label: "Manage Users", url: "/admin/users", icon: <GroupOutlined /> },
        { key: "posts", label: "Manage Blogs", url: "/admin/posts", icon: <ArticleOutlined /> },
        { key: "reports", label: "Reports", url: "/admin/reports", icon: <AssessmentOutlined /> },
    ];

    return (
        <Box
            p={2.5}
            width={260}
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            bgcolor="#fff"
        >

            {/* LOGO SECTION */}
            <Box>
                <Box display="flex" alignItems="center" mb={4} px={1} gap={1.5}>
                    <Avatar sx={{ bgcolor: "#E5F0FF", width: 42, height: 42 }}>
                        <Typography fontWeight={700} fontSize={15} color="#1A73E8">
                            A
                        </Typography>
                    </Avatar>

                    <Box>
                        <Typography fontSize={19} fontWeight={800}>Admin Panel</Typography>
                        <Typography fontSize={12} color="#787878">Blog Management</Typography>
                    </Box>
                </Box>

                {/* MENU LIST */}
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
                                    mb: 1,
                                    py: 1.15,
                                    borderRadius: "10px",
                                    bgcolor: isActive ? "#E8F1FF" : "transparent",
                                    color: isActive ? "#1A73E8" : "#4B5563",
                                    "&:hover": { bgcolor: "#E8F1FF" }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        color: isActive ? "#1A73E8" : "#4B5563"
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={menu.label}
                                    primaryTypographyProps={{
                                        fontSize: 14.5,
                                        fontWeight: isActive ? 700 : 500
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Box>

            {/* SETTINGS + LOGOUT */}
            <Box>

                <ListItemButton
                    sx={{
                        py: 1.2,
                        borderRadius: "10px",
                        mb: 0.7,
                        "&:hover": { bgcolor: "#F5F6FA" }
                    }}
                    onClick={() => navigate("/admin/settings")}
                >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                        <SettingsOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>

                <Button
                    startIcon={<Logout />}
                    fullWidth
                    sx={{
                        bgcolor: "#FFECEC",
                        color: "#D64545",
                        fontWeight: 700,
                        py: 1,
                        borderRadius: "10px",
                        "&:hover": { bgcolor: "#FFD9D9" },
                        mt: 1
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
}
