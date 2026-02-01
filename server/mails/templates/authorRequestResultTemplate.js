import { baseEmailTemplate } from "./baseTemplate.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export const authorRequestResultTemplate = ({
    name,
    status,
    reason = "",
    reviewLink,
}) =>
    baseEmailTemplate({
        title: status === "APPROVED" ? "Author Request Approved" : "Author Request Rejected",
        preheader: "Your author access request has been reviewed",
        buttonText: "Review Your Account",
        buttonLink: reviewLink,
        content: `
            <p>Hello ${name},</p>

            <p>
                Your request for <strong>Author access</strong> on
                <strong>TechStream</strong> has been <strong>${status.toLowerCase()}</strong>.
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

            ${status === "REJECTED" ? `<p><strong>Reason for rejection:</strong></p>
            <p style="background:#f9fafb;padding:12px;border-radius:6px;">
                ${escapeHtml(reason || "No reason provided")}
            </p>` : ""}<br>
        `,
    });
