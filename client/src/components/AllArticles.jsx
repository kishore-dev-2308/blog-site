import React, { useState } from "react";
import {
    Box,
    Container,
    Grid,
    Pagination,
    Chip,
    CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "./ArticleCard";
import { getBlogByCategory, getCategories } from "../services/homeService";

function AllArticles() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn:
            () =>
                getCategories({
                    type: 1,
                }),
        staleTime: 1000 * 60 * 10,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["blogs", page, selectedCategory],
        queryFn: () =>
            getBlogByCategory({
                page,
                categoryId: selectedCategory === "All" ? "" : selectedCategory,
            }),
        keepPreviousData: true,
    });

    const articles = data?.blogs || [];
    const pageCount = data?.pages || 1;

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
                <Chip
                    label="All"
                    onClick={() => {
                        setSelectedCategory("All");
                        setPage(1);
                    }}
                    color={selectedCategory === "All" ? "primary" : "default"}
                    variant={selectedCategory === "All" ? "filled" : "outlined"}
                    sx={{ fontWeight: "bold" }}
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
                        variant={selectedCategory === cat.id ? "filled" : "outlined"}
                        sx={{ fontWeight: "bold" }}
                    />
                ))}
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {articles.length > 0 ? (articles?.map((article) => (
                        <Grid key={article.id} item size={{ xs: 12, sm: 6, md: 4 }}>
                            <ArticleCard {...article} />
                        </Grid>
                    ))) : (
                        <Grid item xs={12}>
                            <Box textAlign="center" py={5}>
                                No articles found.
                            </Box>
                        </Grid>
                    )}
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
        </Container>
    );
}

export default AllArticles;
