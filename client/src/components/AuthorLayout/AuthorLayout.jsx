import React, { useState } from "react";
import {
    Box,
    IconButton,
    Drawer,
    useMediaQuery,
    Typography
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AuthorLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active, setActive] = useState("newpost");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="#FBFCFE">

            <Box flex={1} display="flex">
                {!isMobile && (
                    <Box
                        sx={{
                            width: 260,
                            borderRight: "1px solid #eee",
                            bgcolor: "#fff",
                            flexShrink: 0
                        }}
                    >
                        <Sidebar active={active} setActive={setActive} />
                    </Box>
                )}
                <Drawer open={sidebarOpen} anchor="left" onClose={toggleSidebar}>
                    <Sidebar active={active} setActive={setActive} />
                </Drawer>

                <Box flex={1} p={isMobile ? 2 : 4}>

                    {isMobile && (
                        <IconButton onClick={toggleSidebar} sx={{ mb: 2 }}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    )}

                    <Outlet />

                </Box>
            </Box>

            <Box py={2} textAlign="center" borderTop="1px solid #e5e7eb" bgcolor="#fff">
                <Typography fontSize={12} color="#757575">
                    © 2024 BlogFlow Dashboard. All rights reserved.
                </Typography>
            </Box>

        </Box>
    );
}
