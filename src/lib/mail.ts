import nodemailer from "nodemailer";

let transporter: any = null;

export function getMailTransporter() {
    if (transporter) return transporter;

    const host = process.env.SMTP_HOST || import.meta.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || import.meta.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER || import.meta.env.SMTP_USER;
    const pass = process.env.SMTP_PASS || import.meta.env.SMTP_PASS;
    const secure = (process.env.SMTP_SECURE || import.meta.env.SMTP_SECURE) === "true" || port === 465;

    transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
        pool: true, // Use connection pooling
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 10, // Max 10 messages per second
    });

    return transporter;
}

export async function sendEmailWithRetry(mailOptions: nodemailer.SendMailOptions, retryCount = 1): Promise<any> {
    const activeTransporter = getMailTransporter();

    try {
        const info = await activeTransporter.sendMail(mailOptions);
        console.log(`[Email Sent] Recipient: ${mailOptions.to}, Time: ${new Date().toISOString()}, MessageID: ${info.messageId}`);
        return info;
    } catch (error: any) {
        console.error(`[SMTP Error] Error sending email to ${mailOptions.to}:`, error);
        
        if (retryCount > 0) {
            console.log(`[SMTP Retry] Retrying once to send email to ${mailOptions.to}...`);
            return sendEmailWithRetry(mailOptions, retryCount - 1);
        }
        
        throw error;
    }
}
