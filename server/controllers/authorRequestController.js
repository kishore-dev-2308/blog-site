import { PrismaClient } from "@prisma/client";
import logger from "../logs/winstonLog.js";
import { authorRequestResultTemplate } from "../mails/templates/authorRequestResultTemplate.js";
import { createTransporter } from "../utils/mailer.js";

const prisma = new PrismaClient();

export const getAllRequests = async (req, res) => {

    const { page = 1, limit = 10, status = "ALL" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    try {

        const [requests, total] = await Promise.all([
            prisma.authorRequest.findMany({
                where: status && status !== "ALL" ? { status } : {},
                include: {
                    user: {
                        select: { id: true, name: true, email: true, role: true },
                    },
                },
                orderBy: { id: "desc" },
                skip,
                take: Number(limit),
            }),
            prisma.user.count({ where: { role: { not: 1 } } }),
        ]);

        res.json({
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            requests,
        });

    } catch (error) {
        logger.error(`Fetch author requests failed: ${error.message}`);
        return res.status(500).json({ message: "Unable to fetch author requests" });
    }
}

export const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log("Status:", status);
        const request = await prisma.authorRequest.findFirst({
            where: { id: id },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true },
                },
            },
        });

        if (!request) {
            return res.status(404).json({ message: "Author request not found" });
        }

        await prisma.authorRequest.update({
            where: { id: id },
            data: { status: status },
        });


        if (status === "APPROVED") {
            await prisma.user.update({
                where: { id: request.userId },
                data: { role: 2 },
            });
        }


        try {
            const transporter = createTransporter();

            if (status === "APPROVED") {
                await transporter.sendMail({
                    from: `"Techstream" <${process.env.EMAIL_USER}>`,
                    to: request.user.email,
                    subject: "Request Approved",
                    html: authorRequestResultTemplate({
                        name: request.user.name,
                        status,
                        reason: "",
                        reviewLink: `${process.env.CLIENT_URL}`,
                    }),
                });
            } else if (status === "REJECTED") {
                await transporter.sendMail({
                    from: `"Techstream" <${process.env.EMAIL_USER}>`,
                    to: request.user.email,
                    subject: "Request Rejected",
                    html: authorRequestResultTemplate({
                        name: request.user.name,
                        status,
                        reason: "",
                        reviewLink: `${process.env.CLIENT_URL}`,
                    }),
                });
            }

        } catch (error) {
            logger.error("Error sending verification email:", error);
        }
        res.status(200).json({ message: "Author request status updated", request });
    }
    catch (error) {
        logger.error(`Update author request status failed: ${error.message}`);
        return res.status(500).json({ message: "Unable to update author request status" });
    }
}
