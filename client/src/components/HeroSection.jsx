import React from "react";
import { Container, Typography, Chip } from "@mui/material";

const HeroSection = () => (
  <div
    style={{
      backgroundImage:
        "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdSMsHo9sBo74tyMUWkOWD2spj0I5OiVYWOqHKsVWXKH2SxlPSD-Zf2R1jBzeg2r3pYJtPoBMtkFgkElEXFEuSGTcdrp6ZLyGs3Pyzvn2qk0Je904Dcm480zTthQ6RmT5dh60IR8Kqza-fJb2IhYl9y-vK2sOki-g4IDVWTsEiY46yNXKK9z-uEWdCg6_bum1Jtbe0pEw7eEtZqEEQiCHu25CBeAKTkxYiWb1YddoS5ZOJcJ-jT2lB6AYQk8VXlaciP3cz43GGTCw')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "400px",
      borderRadius: "12px",
      color: "white",
      display: "flex",
      alignItems: "flex-end",
      marginTop:"40px"
    }}
  >
    <Container sx={{ p: 4 }}>
      <Chip label="Featured Article" color="primary" sx={{ mb: 2 }} />
      <Typography variant="h4" fontWeight={700}>
        The Future of AI: Trends to Watch in 2024
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
        By Jane Doe — Published on Oct 26, 2023
      </Typography>
    </Container>
  </div>
);

export default HeroSection;
