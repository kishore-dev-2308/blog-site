export const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  secure: process.env.NODE_ENV === "development" ? false : true,
  path: "/",
};
