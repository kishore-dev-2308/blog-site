import React, { useEffect, useState, useCallback } from "react";
import {
    Box, Button, TextField, Typography,
    MenuItem, Card, CardMedia, Stack, Grid,
    Radio, RadioGroup, FormControlLabel
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import Breadcrumbs from "../Common/BreadcrumbsTrail";
import apiPrivate from "../../api/apiPrivate";
import { fetchBlogById, updateBlog } from "../../services/blogService";
import AppLoader from "../Common/AppLoader";


export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [categories, setCategories] = useState([]);
    const [isPublished, setIsPublished] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
            }),
            Image.configure({ allowBase64: true }),
        ],
        content: "",
        onUpdate({ editor }) {
        },
    });

    const { data: blog, isLoading } = useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id),
    });

    const loadCategories = useCallback(async () => {
        const res = await apiPrivate.get("/category/get-list");
        setCategories(res.data.data || res.data.categories || res.data);
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        if (blog && editor) {
            setTitle(blog.title);
            setCategoryId(blog.categoryId);
            setIsPublished(blog.isPublished ? 1 : 0);
            if (blog.coverImage) {
                setImagePreview(import.meta.env.VITE_SERVER_MEDIA_URL + blog.coverImage);
            }
            editor.commands.setContent(blog.content);
        }
    }, [blog, editor]);

    const handleImageInput = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCoverImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const updateMutation = useMutation({
        mutationFn: (formData) => updateBlog({ id, formData }),
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs"]);
            queryClient.invalidateQueries(["blog", id]);
            navigate("/author/posts");
        },
        onError: (err) => {
            console.error("Blog update error:", err);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("title", title);
        fd.append("categoryId", categoryId);
        fd.append("isPublished", isPublished);
        fd.append("content", editor.getHTML());
        if (coverImage) fd.append("coverImage", coverImage);

        updateMutation.mutate(fd);
    };

    if (isLoading) return <AppLoader />;
    if (!blog) return <Typography>No blog found</Typography>;
    return (
        <>
            <Breadcrumbs
                items={[
                    { label: "Posts", href: "/author/posts" },
                    { label: "Edit Blog" },
                ]}
            />

            <Typography variant="h4" fontWeight={600} mb={3}>
                Edit Blog
            </Typography>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>

                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 8 }}>
                        <TextField
                            label="Blog Title"
                            fullWidth
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Category"
                            select
                            fullWidth
                            required
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Box>
                    <Typography fontWeight={500} mb={1}>
                        Publish Status
                    </Typography>

                    <RadioGroup
                        row
                        value={isPublished ? "published" : "draft"}
                        onChange={(e) => setIsPublished(e.target.value === "published" ? 1 : 0)}
                    >
                        <FormControlLabel
                            value="published"
                            control={<Radio color="success" />}
                            label="Published"
                        />

                        <FormControlLabel
                            value="draft"
                            control={<Radio color="warning" />}
                            label="Draft"
                        />
                    </RadioGroup>
                </Box>


                <Box>
                    <Typography fontWeight={500} mb={1}>Content</Typography>

                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar fixed stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Control
                                    onClick={() => {
                                        const url = window.prompt("Enter image URL:");
                                        if (url) editor.chain().focus().setImage({ src: url }).run();
                                    }}
                                >
                                    🖼️
                                </RichTextEditor.Control>
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content style={{ minHeight: "350px" }} />
                    </RichTextEditor>
                </Box>

                <Box>
                    <Typography fontWeight={500} mb={1}>Cover Image</Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        {imagePreview && (
                            <Card sx={{ width: 200, height: 140 }}>
                                <CardMedia
                                    component="img"
                                    image={imagePreview}
                                    alt="Preview"
                                    sx={{ objectFit: "cover", height: "100%" }}
                                />
                            </Card>
                        )}
                    </Stack>

                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Upload Image
                        <input type="file" hidden accept="image/*" onChange={handleImageInput} />
                    </Button>
                </Box>

                <Box display="flex" justifyContent="end" gap={2}>
                    <Button variant="outlined" onClick={() => navigate("/author/posts")}>
                        Cancel
                    </Button>

                    <Button type="submit" variant="contained">
                        Update Blog
                    </Button>
                </Box>
            </Box>
        </>
    );
}
