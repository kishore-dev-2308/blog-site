export const baseEmailTemplate = ({
    title,
    content,
    buttonText,
    buttonLink,
    preheader = "",
}) => {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
<span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
    
    <!-- HEADER -->
    <tr>
        <td style="padding:30px;text-align:center;background:#667eea;">
            <img src="${process.env.APP_LOGO_URL}" alt="Logo" width="120" style="display:block;margin:auto;" />
        </td>
    </tr>

    <!-- BODY -->
    <tr>
        <td style="padding:40px;color:#333333;">
            <h2 style="margin-top:0;">${title}</h2>
            ${content}

            ${buttonText && buttonLink
            ? `
                    <div style="margin-top:30px;text-align:center;">
                        <a href="${buttonLink}"
                           style="background:#667eea;color:#ffffff;
                                  padding:14px 32px;
                                  text-decoration:none;
                                  border-radius:6px;
                                  display:inline-block;
                                  font-weight:600;">
                            ${buttonText}
                        </a>
                    </div>`
            : ""
        }
        </td>
    </tr>

    <!-- FOOTER -->
    <tr>
        <td style="padding:25px;text-align:center;background:#f9fafb;color:#6b7280;font-size:13px;">
            © ${new Date().getFullYear()} TechStream · 
            <a href="${process.env.CLIENT_URL}" style="color:#667eea;text-decoration:none;">Visit Website</a>
        </td>
    </tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`.trim();
};
