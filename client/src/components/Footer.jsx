import React from "react";
import { Container, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  const links = [
    { label: "About", path: "/about" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <footer className="border-top mt-5 py-4">
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={2}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            TechStream
          </Typography>
          <Stack direction="row" spacing={3}>
            {links.map((link) => (
              <Link key={link.label} href={link.path} color="inherit">
                {link.label}
              </Link>
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            © 2024 TechStream. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </footer>
  );
}

export default Footer;
