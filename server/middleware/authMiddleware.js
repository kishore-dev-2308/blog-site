import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

export const authorizeRoles = (...allowedRoles) => {
   return (req, res, next) => {
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorised" });

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }
        next();

    }
} 