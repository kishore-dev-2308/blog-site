import React from "react";
import { Container, Grid } from "@mui/material";
import HeroSection from "../components/HeroSection";
import LatestArticles from "../components/LatestArticles";
import AllArticles from "../components/AllArticles";

const Home = () => (
  <>
    <HeroSection />
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ py: { xs: 3, md: 5 } }}
    >
      <Grid container spacing={4}>
        <LatestArticles />
      </Grid>

      <Grid container spacing={4} sx={{mt:2}}>
        <AllArticles />
      </Grid>
    </Container>
  </>
);

export default Home;
