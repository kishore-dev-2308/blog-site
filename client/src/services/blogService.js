import apiPrivate from "../api/apiPrivate";

export const fetchBlogs = async () => {
  const res = await apiPrivate.get("/blog/list");
  return res.data.blogs;
};

export const createBlog = async (formData) => {
  const res = await apiPrivate.post("/blog/store", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateBlog = async ({ id, formData }) => {
  const res = await apiPrivate.put(`/blog/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const fetchBlogById = async (id) => {
  const res = await apiPrivate.get(`/blog/${id}`);
  return res.data.blog;
};
