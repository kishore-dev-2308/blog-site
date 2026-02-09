export const handleGlobalErrors = (error) => {
  if (!error.response) {
    // window.location.href = "/500";
    console.error("Network error occurred:", error);
    return Promise.reject(error);
  }

  const status = error.response.status;
  const url = error.config?.url || "";

  // Skip global handling for auth refresh
  if (url.includes("/auth/refresh")) {
    return Promise.reject(error);
  }

  if (status === 404) {
    window.location.href = "/404";
  }

  if (status >= 500) {
    // const path = window.location.pathname;
    // if (path.startsWith("/admin")) window.location.href = "/admin/500";
    // else if (path.startsWith("/author")) window.location.href = "/author/500";
    // else window.location.href = "/500";
    console.log("Server error occurred:", error);
  }

  return Promise.reject(error);
};
