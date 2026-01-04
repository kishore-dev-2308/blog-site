import { Box } from "@mui/material";
import "./AppLoader.css";

export default function AppLoader({ fullScreen = true }) {
    return (
        <Box className={fullScreen ? "app-loader-overlay" : "app-loader-inline"}>
            <div className="logo-wrapper">
                <img
                    src="/logo-new.png"
                    alt="Loading..."
                    className="loader-logo"
                />
            </div>
        </Box>
    );
}
