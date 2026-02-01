import React, { useState, useEffect } from "react";
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
    CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../components/ArticleCard";
import { getBlogByCategory, getCategories } from "../services/homeService";

function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 10,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["blogs", page, debouncedSearch, selectedCategory],
        queryFn: () =>
            getBlogByCategory({
                page,
                search: debouncedSearch.trim(),
                categoryId: selectedCategory === "All" ? "" : selectedCategory,
            }),
        keepPreviousData: true,
    });

    const posts = data?.blogs || [];
    const pageCount = data?.pages || 1;

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
                onChange={(e) => setSearch(e.target.value)}
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
                <Chip
                    label="All"
                    onClick={() => {
                        setSelectedCategory("All");
                        setPage(1);
                    }}
                    color={selectedCategory === "All" ? "primary" : "default"}
                    sx={{ flexShrink: 0, fontWeight: 600 }}
                />

                {categories.map((cat) => (
                    <Chip
                        key={cat.id}
                        label={cat.name}
                        onClick={() => {
                            setSelectedCategory(cat.id);
                            setPage(1);
                        }}
                        color={selectedCategory === cat.id ? "primary" : "default"}
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
                        <ListItemButton
                            selected={selectedCategory === "All"}
                            onClick={() => {
                                setSelectedCategory("All");
                                setPage(1);
                            }}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                "&.Mui-selected": {
                                    backgroundColor: "primary.main",
                                    color: "white",
                                },
                            }}
                        >
                            <ListItemText primary="All" />
                        </ListItemButton>

                        {isCategoriesLoading ? (
                            <Box display="flex" justifyContent="center" mt={2}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : (
                            categories.map((cat) => (
                                <ListItemButton
                                    key={cat.id}
                                    selected={selectedCategory === cat.id}
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        setPage(1);
                                    }}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 1,
                                        "&.Mui-selected": {
                                            backgroundColor: "primary.main",
                                            color: "white",
                                        },
                                    }}
                                >
                                    <ListItemText primary={cat.name} />
                                </ListItemButton>
                            ))
                        )}

                    </List>
                </Box>

                <Box flex={1} minWidth={0}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" mt={6}>
                            <CircularProgress />
                        </Box>
                    ) : posts.length === 0 ? (
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
                            {posts.map((post) => (
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
