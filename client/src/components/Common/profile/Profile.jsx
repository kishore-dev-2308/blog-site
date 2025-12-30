import React from "react";
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Button
} from "@mui/material";

import { Edit, Twitter, LinkedIn, Facebook } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import EditProfileModal from "./EditProfileModal";
import { fetchProfile, updateProfile } from "./userService";

export default function Profile() {
    const queryClient = useQueryClient();
    const [open, setOpen] = React.useState(false);

    const { data: profileData, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile
    });

    const updateMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(["profile"]);
            setOpen(false);
        }
    });

    if (isLoading) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Typography fontWeight={800} fontSize={30} mb={0.5}>
                Profile
            </Typography>
            <Typography fontSize={14} color="#6B7280" mb={4}>
                View and manage your personal information.
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "white",
                    mb: 4
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">

                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            sx={{ width: 64, height: 64 }}
                            src={
                                profileData?.profileImage
                                    ? import.meta.env.VITE_SERVER_MEDIA_URL + profileData.profileImage
                                    : undefined
                            }
                        />

                        <Box>
                            <Typography fontWeight={700} fontSize={20}>
                                {profileData?.name}
                            </Typography>
                            <Typography fontSize={14} color="#6B7280">
                                {profileData?.email}
                            </Typography>

                            <Typography fontSize={13} color="#374151" sx={{ mt: 0.7 }}>
                                {profileData?.bio || "-"}
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        startIcon={<Edit />}
                        variant="contained"
                        sx={{ textTransform: "none", borderRadius: "8px" }}
                        onClick={() => setOpen(true)}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "white",
                    mb: 4
                }}
            >
                <Typography fontWeight={700} fontSize={18} mb={2}>
                    Social Links
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap">
                    {profileData?.twitter && (
                        <Button
                            startIcon={<Twitter />}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: "20px", px: 2 }}
                            href={profileData.twitter}
                            target="_blank"
                        >
                            Twitter
                        </Button>
                    )}

                    {profileData?.linkedin && (
                        <Button
                            startIcon={<LinkedIn />}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: "20px", px: 2 }}
                            href={profileData.linkedin}
                            target="_blank"
                        >
                            LinkedIn
                        </Button>
                    )}

                    {profileData?.facebook && (
                        <Button
                            startIcon={<Facebook />}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: "20px", px: 2 }}
                            href={profileData.facebook}
                            target="_blank"
                        >
                            Facebook
                        </Button>
                    )}

                    {profileData?.instagram && (
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: "20px", px: 2 }}
                            href={profileData.instagram}
                            target="_blank"
                        >
                            Instagram
                        </Button>
                    )}

                    {profileData?.github && (
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: "20px", px: 2 }}
                            href={profileData.github}
                            target="_blank"
                        >
                            GitHub
                        </Button>
                    )}
                </Box>
            </Paper>


            <EditProfileModal
                open={open}
                onClose={() => setOpen(false)}
                initialData={{
                    ...profileData,
                    profileImageURL: profileData.profileImage
                        ? import.meta.env.VITE_SERVER_MEDIA_URL + profileData.profileImage
                        : ""
                }}
                onSave={(fd) => updateMutation.mutate(fd)}
            />
        </Box>
    );
}
