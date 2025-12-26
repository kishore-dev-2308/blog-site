import React, { useState, useCallback, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Card,
    CardMedia,
    Stack,
    Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import Breadcrumbs from "../Common/BreadcrumbsTrail";
import { createBlog } from "../../services/blogService";
import apiPrivate from "../../api/apiPrivate";

export default function CreateBlog() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [content, setContent] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [categories, setCategories] = useState([]);

    // --------------------- TIPTAP EDITOR ---------------------
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            }),
            Image.configure({
                allowBase64: true,
                inline: true,
            }),
        ],
        content: "",
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });

    // --------------------- IMAGE PREVIEW ---------------------
    const handleImageInput = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCoverImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const addImageToEditor = () => {
        const url = window.prompt("Enter image URL:");
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs"]);
            navigate("/author/posts");
        },
        onError: (err) => {
            console.error("Blog create error:", err);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("title", title);
        fd.append("categoryId", categoryId);
        fd.append("content", content);
        if (coverImage) fd.append("coverImage", coverImage);

        mutation.mutate(fd);
    };

    const getCategories = useCallback(async () => {
        try {
            const res = await apiPrivate.get("/category/get-list");
            setCategories(res.data.categories || res.data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <>
            <Breadcrumbs
                items={[
                    { label: "Dashboard", href: "/author/dashboard" },
                    { label: "Posts", href: "/author/posts" },
                    { label: "Create Blog" },
                ]}
            />

            <Typography
                variant="h4"
                fontWeight={600}
                mb={3}
                sx={{
                    fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
                }}
            >
                Create New Blog
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 8 }}>
                        <TextField
                            label="Blog Title"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            size="medium"
                        />
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Category"
                            select
                            fullWidth
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            size="medium"
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
                    <Typography mb={1} fontWeight={500}>
                        Content
                    </Typography>

                    <RichTextEditor
                        editor={editor}
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "4px",
                            width: "100%",
                            "&:focus-within": { borderColor: "#1976d2" },
                        }}
                    >
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
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
                                <Button size="small" onClick={addImageToEditor}>
                                    🖼️
                                </Button>
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content
                            sx={{
                                minHeight: "350px",
                                p: 2,
                            }}
                        />
                    </RichTextEditor>
                </Box>

                <Box>
                    <Typography fontWeight={500} mb={1}>
                        Cover Image
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Button variant="contained" component="label">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageInput}
                            />
                        </Button>

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
                </Box>

                <Button type="submit" variant="contained" size="large">
                    Publish Blog
                </Button>
            </Box>
        </>
    );
}
