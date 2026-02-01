import { toast } from "react-toastify";
import apiPublic from "../api/apiPublic";
import { setUser } from "../store/authSlice";

export const latestBlogs = async () => {
  const res = await apiPublic.get(`/home/latest`);
  if (res.status !== 200) {
    toast.error("Failed to fetch latest blogs");
    return [];
  }
  return res?.data?.blogs || [];
};

export const getBlogBySlug = async (slug) => {
  const res = await apiPublic.get(`/home/get-by-slug/${slug}`);

  if (res.status !== 200) {
    toast.error("Failed to fetch latest blogs");
    return [];
  }
  return res.data;
};

export const getBlogByCategory = async ({ page = 1, search = "", categoryId = "" }) => {
  const res = await apiPublic.get(`/home/get-by-category?page=${page}&search=${search}&category=${categoryId}`);
  if (res.status !== 200) {
    toast.error("Failed to fetch latest blogs");
    return [];
  }
  return res.data;
}

export const getCategories = async () => {
  const res = await apiPublic.get("/category/get-list");
  if (res.status !== 200) {
    console.error("Failed to fetch categories");
    return [];
  }
  return res.data || [];
};
