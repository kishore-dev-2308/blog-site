import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { Container } from "@mui/material";

const UserLayout = () => {
  return (
    <>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
        <Header />
      </Container>

      <main style={{ marginTop: "90px" }}>
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
          <Outlet />
        </Container>
      </main>

      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, md: 3 }, mt: 5 }}>
        <Footer />
      </Container>
    </>
  );
};

export default UserLayout;
