import { Box, Typography, Card, CardMedia, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "../../services/blogService";
import BreadcrumbsTrail from "../Common/BreadcrumbsTrail";

export default function ViewBlog() {
    const { id } = useParams();

    const { data: blog, isLoading } = useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id),
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (!blog) return <Typography>No blog found</Typography>;

    return (
        <Box>
            <BreadcrumbsTrail
                items={[
                    { label: "Dashboard", href: "/author/dashboard" },
                    { label: "Posts", href: "/author/posts" },
                    { label: "Create Blog" },
                ]}
            />
            <Typography variant="h4" fontWeight={700} mb={2}>
                {blog.title}
            </Typography>

            <Chip
                label={blog.category?.name}
                color="primary"
                sx={{ mb: 3 }}
            />

            {blog.coverImage && (
                <Card sx={{ mb: 3 }}>
                    <CardMedia
                        component="img"
                        height="350"
                        image={import.meta.env.VITE_SERVER_MEDIA_URL + blog.coverImage}
                        alt="Cover"
                        sx={{ objectFit: "cover" }}
                    />
                </Card>
            )}

            <Box
                sx={{
                    "& img": { maxWidth: "100%", borderRadius: 2 },
                    "& p": { lineHeight: 1.8, fontSize: "1rem" },
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </Box>
    );
}
