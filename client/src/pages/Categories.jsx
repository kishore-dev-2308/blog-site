import React, { useState } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Chip,
    Pagination,
    TextField,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import ArticleCard from "../components/ArticleCard";

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

const posts = [
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Web Development",
        author: "John Doe",
        date: "Jan 15, 2025",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    },
    {
        id: 2,
        category: "AI",
        title: "How AI Will Change Everything",
        author: "Sarah Lee",
        date: "Jan 10, 2025",
        image:
            "https://images.unsplash.com/photo-1667372114972-dc705bdb6cc5?w=800&q=80",
    },
    {
        id: 3,
        category: "Design",
        title: "Minimal UI Design Principles",
        author: "Ravi Kumar",
        date: "Jan 08, 2025",
        image:
            "https://images.unsplash.com/photo-1603209341834-4e4c6c3978b9?w=800&q=80",
    },
    {
        id: 4,
        category: "Technology",
        title: "React 19 — What’s New?",
        author: "Alex Kim",
        date: "Jan 12, 2025",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    },
];

function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;

    const filtered = posts.filter((p) => {
        const matchesCategory =
            selectedCategory === "All" || p.category === selectedCategory;
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const pageCount = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <Container sx={{ py: { xs: 3, md: 6 } }}>
            <Typography variant="h4" fontWeight={800} mb={2}>
                Categories
            </Typography>

            <Typography color="text.secondary" mb={4} fontSize={16}>
                Explore all blog posts based on your favorite topics.
            </Typography>

            <TextField
                fullWidth
                placeholder="Search articles..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                sx={{
                    mb: 4,
                    background: "#fafafa",
                    borderRadius: 2,
                }}
            />

            <Box
                sx={{
                    display: { xs: "flex", md: "none" },
                    overflowX: "auto",
                    gap: 2,
                    mb: 3,
                    pb: 1,
                    "&::-webkit-scrollbar": { height: 4 },
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
                        sx={{ flexShrink: 0, fontWeight: 600 }}
                    />
                ))}
            </Box>

            <Box display="flex" gap={4}>
                <Box
                    sx={{
                        width: 250,
                        display: { xs: "none", md: "block" },
                        height: "80vh",
                        overflowY: "auto",
                        pr: 1,
                        borderRight: "1px solid #eee",
                        "&::-webkit-scrollbar": { width: 4 },
                    }}
                >
                    <List>
                        {categories.map((cat) => (
                            <ListItemButton
                                key={cat}
                                selected={selectedCategory === cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setPage(1);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    "&.Mui-selected": {
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "primary.dark",
                                        },
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={cat}
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                <Box flex={1} minWidth={0}>
                    {paginated.length === 0 ? (
                        <Typography
                            variant="h6"
                            textAlign="center"
                            color="text.secondary"
                            sx={{ mt: 5 }}
                        >
                            ❌ No results found.
                        </Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {paginated.map((post) => (
                                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                                    <ArticleCard {...post} />
                                </Grid>
                            ))}
                        </Grid>
                    )}

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
                </Box>
            </Box>
        </Container>
    );

}

export default CategoriesPage;
