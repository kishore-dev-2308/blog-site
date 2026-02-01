import { baseEmailTemplate } from "./baseTemplate.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export const authorRequestTemplate = ({
    name,
    email,
    reason,
    reviewLink,
}) =>
    baseEmailTemplate({
        title: "New Author Access Request",
        preheader: "A user has requested author privileges",
        buttonText: "Review Request",
        buttonLink: reviewLink,
        content: `
            <p>Hello Admin,</p>

            <p>
                A new user has requested <strong>Author access</strong> on
                <strong>TechStream</strong>.
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>

            <p><strong>Reason:</strong></p>
            <p style="background:#f9fafb;padding:12px;border-radius:6px;">
                ${escapeHtml(reason)}
            </p>

            <p>
                Please review this request and take appropriate action.
            </p>
        `,
    });
