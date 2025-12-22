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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation, useNavigate } from "react-router-dom";
import apiPrivate from "../api/apiPrivate";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/authSlice";
import { toast } from "react-toastify";

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((s) => s.auth);

    const handleToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");

        try {
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

    return (
        <>
            <AppBar
                position="fixed"
                color="default"
                elevation={1}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "#fff",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters className="d-flex justify-content-between" sx={{ py: 1 }}>
                        
                        <Box className="d-flex align-items-center gap-2">
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#137fec",
                                    textDecoration: "none",
                                    mr: 3,
                                }}
                            >
                                TechStream
                            </Typography>

                            <Box className="d-none d-lg-flex gap-4">
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;

                                    return (
                                        <Button
                                            key={link.label}
                                            component={Link}
                                            to={link.path}
                                            size="small"
                                            sx={{
                                                color: isActive ? "#137fec" : "#333",
                                                fontWeight: isActive ? 700 : 400,
                                                borderBottom: isActive
                                                    ? "2px solid #137fec"
                                                    : "2px solid transparent",
                                                borderRadius: 0,
                                                pb: 0.5,
                                            }}
                                        >
                                            {link.label}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Box>

                        <Box className="d-flex align-items-center gap-2">
                            
                            <Box className="d-none d-sm-flex align-items-center bg-light px-2 rounded-pill">
                                <SearchIcon sx={{ color: "gray" }} />
                                <InputBase placeholder="Search..." sx={{ ml: 1, flex: 1 }} />
                            </Box>

                            {!isAuthenticated ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            )}

                            <IconButton onClick={handleToggle} className="d-lg-none">
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="right" open={mobileOpen} onClose={handleToggle}>
                <Box sx={{ width: 240, mt: 8 }}>
                    <List>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;

                            return (
                                <ListItemButton
                                    key={link.label}
                                    component={Link}
                                    to={link.path}
                                    onClick={handleToggle}
                                    sx={{
                                        backgroundColor: isActive ? "#e8f3ff" : "transparent",
                                        borderLeft: isActive
                                            ? "4px solid #137fec"
                                            : "4px solid transparent",
                                        color: isActive ? "#137fec" : "#333",
                                        "&:hover": {
                                            backgroundColor: "#f0f7ff",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={link.label}
                                        primaryTypographyProps={{
                                            fontWeight: isActive ? 700 : 400,
                                        }}
                                    />
                                </ListItemButton>
                            );
                        })}

                        {isAuthenticated && (
                            <ListItemButton
                                onClick={() => {
                                    handleLogout();
                                    handleToggle();
                                }}
                                sx={{
                                    mt: 1,
                                    bgcolor: "#ffecec",
                                    borderLeft: "4px solid #d64545",
                                    color: "#d64545",
                                    "&:hover": { bgcolor: "#ffd9d9" },
                                }}
                            >
                                <LogoutIcon sx={{ mr: 1 }} />
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
