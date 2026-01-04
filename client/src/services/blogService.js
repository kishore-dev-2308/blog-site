import { toast } from "react-toastify";
import apiPrivate from "../api/apiPrivate";
import { setUser } from "../store/authSlice";

export const fetchBlogs = async () => {
  const res = await apiPrivate.get("/blog/list");
  return res.data.blogs;
};

export const createBlog = async (formData) => {
  const toastId = toast.loading("Publishing...");
  const res = await apiPrivate.post("/blog/store", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (res.status === 201) {
    toast.update(toastId, {
      render: "Blog created successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  }
  else {
    toast.update(toastId, {
      render: "Failed to create blog. Please try again.",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
  return res.data;
};

export const updateBlog = async ({ id, formData }) => {
  const toastId = toast.loading("Updating...");
  const res = await apiPrivate.post(`/blog/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (res.status === 201) {
    toast.update(toastId, {
      render: "Blog updated successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    dispatch(setUser(res.data.user));
  }
  else {
    toast.update(toastId, {
      render: "Failed to update blog. Please try again.",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
  return res.data;
};

export const fetchBlogById = async (id) => {
  const res = await apiPrivate.get(`/blog/${id}`);

  if (res.status !== 200) {
    toast.error({
      render: "Failed to get blog details. Please try again.",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }

  return res.data.data;
};

export const fetchRecentBlogs = async () => {
  const res = await apiPrivate.get("/blog/recent-blogs");

  if (res.status !== 200) {
    toast.error({
      render: "Failed to fetch recent blogs. Please try again.",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
  return res.data.blogs;
}

export const deleteBlog = async (id) => {
  const toastId = toast.loading("Deleting blog...");
  const res = await apiPrivate.delete(`/blog/${id}`);
  if (res.status !== 200) {
    toast.update(toastId, {
      render: "Failed to delete blog. Please try again.",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
  else {
    toast.update(toastId, {
      render: "Blog deleted successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  }
  return res.data;
};
