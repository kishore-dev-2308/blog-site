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

        const allowedStatus = ["APPROVED", "REJECTED"];
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

        if (request.status !== "PENDING") {
            return res.status(400).json({
                message: "This request has already been processed",
            });
        }

        const updatedRequest = await prisma.$transaction(async (tx) => {
            const updated = await tx.authorRequest.update({
                where: { id: requestId },
                data: { status },
            });

            if (status === "APPROVED") {
                await tx.user.update({
                    where: { id: request.userId },
                    data: { role: 2 },
                });
            }

            return updated;
        });

        res.status(200).json({
            message: "Author request status updated",
            request: updatedRequest,
        });


        try {
            const transporter = createTransporter();

            await transporter.sendMail({
                from: `"Techstream" <${process.env.EMAIL_USER}>`,
                to: request.user.email,
                subject:
                    status === "APPROVED"
                        ? "Request Approved"
                        : "Request Rejected",
                html: authorRequestResultTemplate({
                    name: request.user.name,
                    status,
                    reason: "",
                    reviewLink: `${process.env.CLIENT_URL}`,
                }),
            });
        } catch (mailError) {
            logger.error("Error sending status email:", mailError);
        }
    }
    catch (error) {
        logger.error(`Update author request status failed: ${error.message}`);
        return res.status(500).json({ message: "Unable to update author request status" });
    }
}
