import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
};


export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) return res.sendStatus(401);

        const role = Number(req.user.role);

        if (!roles.includes(role)) {
            return res.sendStatus(403);
        }

        next();
    };
};

