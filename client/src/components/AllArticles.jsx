import React, { useState } from 'react'
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Pagination,
    Chip,
} from "@mui/material";
import ArticleCard from './ArticleCard';

const categories = [
    "All",
    "Technology",
    "Design",
    "AI",
    "Development",
    "Health",
    "Travel",
    "Science",
    "Finance",
    "Lifestyle",
];

const articles = [
    {
        id: 1,
        category: "Technology",
        title: "The Future of JavaScript Frameworks",
        author: "John Doe",
        date: "Oct 25, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 2,
        category: "Design",
        title: "Mastering Modern Web Design",
        author: "Sarah Lee",
        date: "Oct 21, 2025",
        image:
            "https://images.unsplash.com/photo-1603209341834-4e4c6c3978b9?w=800&q=80",
    },
    {
        id: 3,
        category: "AI",
        title: "How AI is Changing Everything",
        author: "Rajesh Patel",
        date: "Oct 15, 2025",
        image:
            "https://images.unsplash.com/photo-1667372114972-dc705bdb6cc5?w=800&q=80",
    },
    {
        id: 4,
        category: "Development",
        title: "10 Tips to Boost Your Coding Skills",
        author: "Kavya Sharma",
        date: "Oct 18, 2025",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    },
    {
        id: 5,
        category: "Technology",
        title: "React 19 — What’s New?",
        author: "Alex Kim",
        date: "Oct 30, 2025",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    },
    {
        id: 6,
        category: "Design",
        title: "Color Psychology in UI Design",
        author: "Nina Rossi",
        date: "Oct 27, 2025",
        image:
            "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?w=800&q=80",
    },
];

function AllArticles() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;

    const filteredArticles =
        selectedCategory === "All"
            ? articles
            : articles.filter((a) => a.category === selectedCategory);

    const pageCount = Math.ceil(filteredArticles.length / itemsPerPage);
    const paginated = filteredArticles.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    return (
        <Container sx={{ py: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 1.5,
                    pb: 2,
                    mb: 4,
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setPage(1);
                        }}
                        color={selectedCategory === cat ? "primary" : "default"}
                        variant={selectedCategory === cat ? "filled" : "outlined"}
                        sx={{
                            flexShrink: 0,
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                    />
                ))}
            </Box>

            <Grid container spacing={3}>
                {paginated.map((article) => (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <ArticleCard {...article} />
                    </Grid>
                ))}
            </Grid>

            {pageCount > 1 && (
                <Box display="flex" justifyContent="center" mt={5}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        size="large"
                    />
                </Box>
            )}
        </Container>
    )
}

export default AllArticles