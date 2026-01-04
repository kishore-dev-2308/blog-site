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
import apiPrivate from "../../api/apiPrivate";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/authSlice";
import { toast } from "react-toastify";

export default function Sidebar({ active, setActive }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((s) => s.auth);

    const menus = [
        { key: "dashboard", label: "Dashboard", url: "/admin", icon: <DashboardOutlined /> },
        { key: "users", label: "Manage Users", url: "/admin/users", icon: <GroupOutlined /> },
        { key: "posts", label: "Manage Blogs", url: "/admin/posts", icon: <ArticleOutlined /> },
        { key: "reports", label: "Reports", url: "/admin/reports", icon: <AssessmentOutlined /> },
        { key: "profile", label: "Profile", url: "/admin/profile", icon: <SettingsOutlined /> },
    ];

    const handleLogout = async () => {
        try {
            const toastId = toast.loading("Logging out...");

            await apiPrivate.post("/auth/logout", {}, { withCredentials: true });

            dispatch(clearUser());

            toast.update(toastId, {
                render: "Logged out successfully 👋",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            navigate("/login");
        } catch (err) {
            toast.error("Logout failed. Try again!");
        }
    };

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

            <Box>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={4}
                >
                    <Avatar
                        sx={{ width: 50, height: 50 }}
                        src={
                            user?.profileImage
                                ? import.meta.env.VITE_SERVER_MEDIA_URL + user.profileImage
                                : undefined
                        }
                    />

                    <Box display="flex" alignItems="center">
                        <img
                            src="/logo-new.png"
                            alt="TechStream"
                            style={{
                                width: "180px",
                                display: "block"
                            }}
                        />
                    </Box>
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

            <Box>
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
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
}
