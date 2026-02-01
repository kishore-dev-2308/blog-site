import React, { useState } from "react";
import { Grid, Typography, Container } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { latestBlogs } from "../services/homeService";
import { useQuery } from "@tanstack/react-query";

const LatestArticles = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['latest-articles'],
    queryFn: latestBlogs,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Latest Articles
      </Typography>
      <Grid container spacing={3} >
        {articles?.map((a, i) => (
          <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <ArticleCard {...a} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default LatestArticles;
