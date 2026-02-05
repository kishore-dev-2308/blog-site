import React from "react";
import { Container, Typography, Chip, Skeleton, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import formateDate from "../utiles/formateDate";
import { fetchFeaturedBlog } from "../services/homeService";
import { toast } from "react-toastify";

const DEFAULT_HERO_IMAGE = `/featured.png`;

const HeroSection = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["featured-blog"],
    queryFn: fetchFeaturedBlog,
  });

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={400}
        sx={{ borderRadius: 3, mt: 5 }}
      />
    );
  }

  if (!data) return null;

  const { slug, title, author, createdAt, coverImage } = data;

  const heroImage = coverImage
    ? `${import.meta.env.VITE_SERVER_MEDIA_URL}${coverImage}`
    : DEFAULT_HERO_IMAGE;

  const handleClick = () => {
    if (slug) {
      navigate(`/blog/${slug}`);
    } else {
      toast.error("Blog slug is missing. Cannot navigate to the article.");
    }
  };

  return (
    <Box
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      sx={{
        cursor: "pointer",
        mt: 5,
        borderRadius: 3,
        overflow: "hidden",
        // transition: "transform 0.3s ease",
        // "&:hover": {
        //   transform: "scale(1.01)",
        // },
      }}
    >
      <Box
        sx={{
          backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.1)),
            url('${heroImage}')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
          color: "white",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Container sx={{ p: 4 }}>
          <Chip label="Featured Article" color="primary" sx={{ mb: 2 }} />

          <Typography variant="h4" fontWeight={700}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            By {author?.name || "Admin"} — Published on {formateDate(createdAt)}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroSection;
