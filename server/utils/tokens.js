import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  });

export const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "30d",
  });

export const hashToken = async (token) => bcrypt.hash(token, 10);

export const verifyHashedToken = async (hash, token) =>
  bcrypt.compare(token, hash);
