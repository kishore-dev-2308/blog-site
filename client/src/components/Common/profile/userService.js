import apiPrivate from "../../../api/apiPrivate";

export const fetchProfile = async () => {
    const res = await apiPrivate.get("/profile");
    return res.data.user;
};

export const updateProfile = async (formData) => {
    const res = await apiPrivate.post("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data.user;
};
