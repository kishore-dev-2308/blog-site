import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Divider,
    Box,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";

export default function EditProfileModal({ open, onClose, initialData, onSave }) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState("");

    const [errors, setErrors] = useState({
        image: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        github: ""
    });

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setBio(initialData.bio || "");
            setFacebook(initialData.facebook || "");
            setInstagram(initialData.instagram || "");
            setTwitter(initialData.twitter || "");
            setLinkedin(initialData.linkedin || "");
            setGithub(initialData.github || "");
            setPreview(initialData.profileImageURL || "");
        }
    }, [initialData]);

    const validateImage = (file) => {
        if (!file) return "";
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) return "Only JPG, PNG, or WebP images are allowed.";
        if (file.size > 2 * 1024 * 1024) return "Image size must be less than 2 MB.";
        return "";
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageError = validateImage(file);
        setErrors((p) => ({ ...p, image: imageError }));

        if (imageError) return;

        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const isValidUrl = (url) => {
        if (!url) return true;
        try {
            new URL(url.startsWith("http") ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    };

    const validateLinks = () => {
        const newErrors = {
            facebook: isValidUrl(facebook) ? "" : "Invalid Facebook URL",
            instagram: isValidUrl(instagram) ? "" : "Invalid Instagram URL",
            twitter: isValidUrl(twitter) ? "" : "Invalid Twitter URL",
            linkedin: isValidUrl(linkedin) ? "" : "Invalid LinkedIn URL",
            github: isValidUrl(github) ? "" : "Invalid GitHub URL",
            image: errors.image
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => e === "");
    };

    const handleSubmit = () => {
        if (!validateLinks()) return;

        const normalize = (url) =>
            url && !url.startsWith("http") ? `https://${url}` : url;

        const fd = new FormData();
        fd.append("name", name);
        fd.append("bio", bio);
        fd.append("facebook", normalize(facebook));
        fd.append("instagram", normalize(instagram));
        fd.append("twitter", normalize(twitter));
        fd.append("linkedin", normalize(linkedin));
        fd.append("github", normalize(github));
        if (profileImage) fd.append("profileImage", profileImage);

        onSave(fd);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700, fontSize: 22 }}>
                Edit Profile
            </DialogTitle>

            <DialogContent sx={{ pb: 1 }}>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            p: 2,
                            borderRadius: 2,
                            background: "#F9FAFB"
                        }}
                    >
                        <Box flex={1}>
                            <Typography fontWeight={600}>Profile Picture</Typography>
                            <Typography fontSize={13} color="gray">
                                JPG, PNG, WebP — max 2 MB.
                            </Typography>

                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ mt: 1, textTransform: "none" }}
                            >
                                Upload Image
                                <input type="file" hidden accept="image/*" onChange={handleImage} />
                            </Button>

                            {errors.image && (
                                <Typography color="error" fontSize={13} mt={1}>
                                    {errors.image}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            {preview && (
                                <img
                                    src={preview||""}
                                    alt="Preview"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "3px solid #E5E7EB"
                                    }}
                                />
                            )}
                        </Box>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography fontWeight={600} fontSize={15} mb={1}>
                            Basic Information
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Bio"
                                multiline
                                minRows={3}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography fontWeight={600} fontSize={15} mb={1}>
                            Social Links
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Facebook"
                                value={facebook}
                                error={!!errors.facebook}
                                helperText={errors.facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                            <TextField
                                label="Instagram"
                                value={instagram}
                                error={!!errors.instagram}
                                helperText={errors.instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                            <TextField
                                label="Twitter"
                                value={twitter}
                                error={!!errors.twitter}
                                helperText={errors.twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                            <TextField
                                label="LinkedIn"
                                value={linkedin}
                                error={!!errors.linkedin}
                                helperText={errors.linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                            <TextField
                                label="GitHub"
                                value={github}
                                error={!!errors.github}
                                helperText={errors.github}
                                onChange={(e) => setGithub(e.target.value)}
                            />
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit} sx={{ px: 3 }}>
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
