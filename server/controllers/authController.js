import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ms from "ms";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import {
    createAccessToken,
    createRefreshToken,
    hashToken,
    verifyHashedToken,
} from "../utils/tokens.js";
import { cookieOptions } from "../utils/cookies.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: { name, email, password: hashed },
        });

        res.status(200).json({ success: true, message: "Registration successful" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.sendStatus(401);

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.sendStatus(401);

        const accessToken = createAccessToken({
            userId: user.id,
            role: user.role,
        });

        const refreshToken = createRefreshToken({ userId: user.id });
        const refreshHash = await hashToken(refreshToken);

        await prisma.session.create({
            data: {
                userId: user.id,
                refreshTokenHash: refreshHash,
                ip: req.ip,
                userAgent: req.get("User-Agent") || "",
                expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES || "30d")),
            },
        }); 
        console.log("Setting cookies with options:", cookieOptions);
        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: ms(process.env.ACCESS_TOKEN_EXPIRES || "15m"),
        });

        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES || "30d"),
        });

        return res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const refresh = async (req, res) => {
    const incoming = req.cookies.refreshToken;
    if (!incoming) return res.sendStatus(401);

    let payload;
    try {
        payload = jwt.verify(incoming, process.env.REFRESH_TOKEN_SECRET);
    } catch {
        return res.sendStatus(403);
    }

    const sessions = await prisma.session.findMany({
        where: { userId: payload.userId },
    });

    let matchedSession = null;
    for (const s of sessions) {
        if (await verifyHashedToken(s.refreshTokenHash, incoming)) {
            matchedSession = s;
            break;
        }
    }

    if (!matchedSession) {
        await prisma.session.deleteMany({ where: { userId: payload.userId } });
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        return res.status(403).json({ message: "Session revoked" });
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { role: true },
    });

    const newAccessToken = createAccessToken({
        userId: payload.userId,
        role: user.role,
    });

    const newRefreshToken = createRefreshToken({ userId: payload.userId });

    await prisma.session.update({
        where: { id: matchedSession.id },
        data: {
            refreshTokenHash: await hashToken(newRefreshToken),
            lastUsedAt: new Date(),
            ip: req.ip,
            userAgent: req.get("User-Agent") || matchedSession.userAgent,
            expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES || "30d")),
        },
    });

    res.cookie("accessToken", newAccessToken, {
        ...cookieOptions,
        maxAge: ms(process.env.ACCESS_TOKEN_EXPIRES || "15m"),
    });

    res.cookie("refreshToken", newRefreshToken, {
        ...cookieOptions,
        maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES || "30d"),
    });

    return res.json({ ok: true });
};


export const logout = async (req, res) => {
    const incoming = req.cookies.refreshToken;

    if (incoming) {
        const payload = jwt.decode(incoming);
        if (payload?.userId) {
            console.log("Logging out user:", payload.userId);
            const sessions = await prisma.session.findMany({
                where: { userId: payload.userId },
            });

            for (const s of sessions) {
                if (await verifyHashedToken(s.refreshTokenHash, incoming)) {
                    await prisma.session.delete({ where: { id: s.id } });
                    break;
                }
            }
        }
    }

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    return res.json({ ok: true });
};

export const currentUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, role: true },
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json({ user });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
