import React from "react";
import { Container, Grid } from "@mui/material";
import HeroSection from "../components/HeroSection";
import LatestArticles from "../components/LatestArticles";
import TrendingPosts from "../components/TrendingPosts";

const Home = () => (
  <>
    <HeroSection />
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ py: { xs: 3, md: 5 } }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <LatestArticles />
        </Grid>
        <Grid item xs={12} md={4}>
          <TrendingPosts />
        </Grid>
      </Grid>
    </Container>
  </>
);

export default Home;
