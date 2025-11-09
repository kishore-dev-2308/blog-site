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
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggle = () => {
        setMobileOpen(!mobileOpen);
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
                    <Toolbar disableGutters className="d-flex justify-content-between">
                        <Box className="d-flex align-items-center gap-2">
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#137fec",
                                    textDecoration: "none",
                                    mr: 2,
                                }}
                            >
                                TechStream
                            </Typography>

                            <Box className="d-none d-lg-flex gap-4">
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.label}
                                        component={Link}
                                        to={link.path}
                                        color="inherit"
                                        size="small"
                                    >
                                        {link.label}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        <Box className="d-flex align-items-center gap-2">
                            <Box className="d-none d-sm-flex align-items-center bg-light px-2 rounded-pill">
                                <SearchIcon sx={{ color: "gray" }} />
                                <InputBase placeholder="Search..." sx={{ ml: 1, flex: 1 }} />
                            </Box>

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
                        {navLinks.map((link) => (
                            <ListItem
                                button
                                key={link.label}
                                component={Link}
                                to={link.path}
                                onClick={handleToggle}
                            >
                                <ListItemText primary={link.label} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
