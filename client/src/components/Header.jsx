import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    InputBase,
    Container,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Divider
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

import { Link, useLocation, useNavigate } from "react-router-dom";
import apiPrivate from "../api/apiPrivate";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/authSlice";
import { toast } from "react-toastify";

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector((s) => s.auth);

    const handleToggle = () => setMobileOpen((prev) => !prev);
    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        handleMenuClose();
        const toastId = toast.loading("Logging out...");
        try {
            await apiPrivate.post("/auth/logout", {}, { withCredentials: true });
            dispatch(clearUser());
            toast.update(toastId, {
                render: "Logged out successfully",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            navigate("/login");
        } catch {
            toast.update(toastId, {
                render: "Logout failed",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
    };

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Categories", path: "/categories" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    const getDashboardPath = () => {
        if (user?.role === 1) return "/admin";
        if (user?.role === 2) return "/author";
        return null;
    };

    const getProfilePath = () => {
        if (user?.role === 1) return "/admin/profile";
        if (user?.role === 2) return "/author/profile";
        return "/profile";
    }

    return (
        <>
            <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: "#fff" }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ py: 1, justifyContent: "space-between" }}>

                        <Box display="flex" alignItems="center" gap={3}>
                            <Link to="/">
                                <img src="/logo-new.png" alt="logo" style={{ width: 180 }} />
                            </Link>

                            <Box display={{ xs: "none", lg: "flex" }} gap={3}>
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Button
                                            key={link.label}
                                            component={Link}
                                            to={link.path}
                                            sx={{
                                                color: isActive ? "#137fec" : "#333",
                                                fontWeight: isActive ? 700 : 400,
                                                borderBottom: isActive ? "2px solid #137fec" : "none",
                                                borderRadius: 0,
                                            }}
                                        >
                                            {link.label}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap={2}>

                            <Box display={{ xs: "none", sm: "flex" }} alignItems="center" px={2} py={0.5} bgcolor="#f5f5f5" borderRadius={20}>
                                <SearchIcon sx={{ color: "gray" }} />
                                <InputBase placeholder="Search..." sx={{ ml: 1 }} />
                            </Box>

                            {!isAuthenticated ? (
                                <Button variant="outlined" component={Link} to="/login">
                                    Login
                                </Button>
                            ) : (
                                <>
                                    <IconButton onClick={handleMenuOpen}>
                                        <Avatar
                                            src={
                                                user?.profileImage
                                                    ? import.meta.env.VITE_SERVER_MEDIA_URL + user.profileImage
                                                    : undefined
                                            }
                                        />
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        {getDashboardPath() && (
                                            <MenuItem
                                                onClick={() => {
                                                    navigate(getDashboardPath());
                                                    handleMenuClose();
                                                }}
                                            >
                                                <DashboardIcon sx={{ mr: 1 }} />
                                                Dashboard
                                            </MenuItem>
                                        )}

                                        <MenuItem
                                            onClick={() => {
                                                navigate(getProfilePath());
                                                handleMenuClose();
                                            }}
                                        >
                                            <PersonIcon sx={{ mr: 1 }} />
                                            Profile
                                        </MenuItem>

                                        {
                                            user?.role === 3 && (
                                                <MenuItem
                                                    onClick={() => {
                                                        navigate("/request-author-access");
                                                        handleMenuClose();
                                                    }}
                                                >
                                                    <DashboardIcon sx={{ mr: 1 }} />
                                                    Become Author
                                                </MenuItem>
                                            )
                                        }

                                        <Divider />

                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon sx={{ mr: 1 }} />
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}

                            <IconButton onClick={handleToggle} sx={{ display: { lg: "none" } }}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="right" open={mobileOpen} onClose={handleToggle}>
                <Box sx={{ width: 240, mt: 8 }}>
                    <List>
                        {navLinks.map((link) => (
                            <ListItemButton
                                key={link.label}
                                component={Link}
                                to={link.path}
                                onClick={handleToggle}
                            >
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        ))}

                        {isAuthenticated && (
                            <>
                                <Divider sx={{ my: 1 }} />

                                {getDashboardPath() && (
                                    <ListItemButton
                                        onClick={() => {
                                            navigate(getDashboardPath());
                                            handleToggle();
                                        }}
                                    >
                                        <DashboardIcon sx={{ mr: 1 }} />
                                        <ListItemText primary="Dashboard" />
                                    </ListItemButton>
                                )}

                                <ListItemButton
                                    onClick={() => {
                                        navigate("/profile");
                                        handleToggle();
                                    }}
                                >
                                    <PersonIcon sx={{ mr: 1 }} />
                                    <ListItemText primary="Profile" />
                                </ListItemButton>

                                <ListItemButton onClick={handleLogout}>
                                    <LogoutIcon sx={{ mr: 1 }} />
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
