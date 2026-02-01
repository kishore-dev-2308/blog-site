import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
  Skeleton,
} from "@mui/material";
import formatDate from "../utiles/formateDate";
import { getBlogBySlug } from "../services/homeService";

const ViewBySlug = () => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Skeleton height={60} />
        <Skeleton height={300} sx={{ mt: 2 }} />
        <Skeleton height={20} sx={{ mt: 2 }} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography color="error">
          Failed to load article
        </Typography>
      </Container>
    );
  }

  const {
    title,
    content,
    coverImage,
    author,
    category,
    createdAt,
  } = data;

  const imageUrl = coverImage
    ? `${import.meta.env.VITE_SERVER_MEDIA_URL}${coverImage}`
    : "https://via.placeholder.com/900x400?text=No+Image";

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 10 }}>
      <Typography variant="caption" color="primary" fontWeight="bold">
        {category?.name}
      </Typography>

      <Typography variant="h3" fontWeight={700} mt={1}>
        {title}
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <Avatar>{author?.name?.[0]}</Avatar>
        <Box>
          <Typography fontWeight={600}>{author?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(createdAt)}
          </Typography>
        </Box>
      </Box>

      <Box
        component="img"
        src={imageUrl}
        alt={title}
        sx={{
          width: "100%",
          height: "350px",
          borderRadius: 3,
          objectFit: "cover",
          mt: 4,
          mb: 4,
        }}
      />

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          "& img": {
            maxWidth: "100%",
            borderRadius: 2,
          },
          "& p": {
            fontSize: "1.05rem",
            lineHeight: 1.8,
            mb: 2,
          },
          "& h2, & h3": {
            mt: 4,
            mb: 2,
          },
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Container>
  );
};

export default ViewBySlug;
