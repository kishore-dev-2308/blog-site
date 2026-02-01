import { baseEmailTemplate } from "./baseTemplate.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export const verifyEmailTemplate = ({ name, link }) =>
    baseEmailTemplate({
        title: "Verify Your Email",
        preheader: "Please verify your email address",
        buttonText: "Verify Email",
        buttonLink: link,
        content: `
            <p>Hi ${escapeHtml(name)},</p>
            <p>Thanks for joining <strong>TechStream</strong>.</p>
            <p>Please verify your email to activate your account.</p>
            <p style="font-size:14px;color:#6b7280;">
                This link expires in 24 hours.
            </p>
        `,
    });
