import { toast } from "react-toastify";
import apiPrivate from "../api/apiPrivate";

export const fetchUsers = async ({ page = 1, search = "", filter = "All" }) => {
    try {
        const res = await apiPrivate.get(
            `/users/get-list?page=${page}&search=${search}&filter=${filter}`
        );

        return res.data;
    } catch (error) {
        toast.error("Failed to get users list. Please try again.", {
            autoClose: 2000,
        });
        throw error;
    }
};


export const updateUserStatus = async ({ id, isActive }) => {
    const toastId = toast.loading("Updating user status...");

    try {
        const res = await apiPrivate.put(`/users/update-status/${id}`, { isActive });

        toast.update(toastId, {
            render: "User status updated successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });

        return res.data;

    } catch (error) {

        toast.update(toastId, {
            render: "Failed to update user status. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 2000,
        });

        throw error;
    }
};
