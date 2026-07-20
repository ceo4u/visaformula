import Plunk from "@plunk/node";

let plunkClient: Plunk | null = null;

function getPlunkClient(): Plunk {
    if (plunkClient) return plunkClient;
    const apiKey = process.env.PLUNK_SECRET_KEY || import.meta.env.PLUNK_SECRET_KEY;
    if (!apiKey) {
        throw new Error("PLUNK_SECRET_KEY environment variable is not set.");
    }
    plunkClient = new Plunk(apiKey);
    return plunkClient;
}

export interface MailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string; // kept for API compatibility but Plunk uses dashboard sender
}

export async function sendEmailWithRetry(mailOptions: MailOptions, retryCount = 1): Promise<any> {
    const client = getPlunkClient();

    try {
        const info = await client.emails.send({
            to: mailOptions.to,
            subject: mailOptions.subject,
            body: mailOptions.html,
        });
        console.log(`[Email Sent] Recipient: ${mailOptions.to}, Time: ${new Date().toISOString()}`);
        return info;
    } catch (error: any) {
        console.error(`[Plunk Error] Error sending email to ${mailOptions.to}:`, error);

        if (retryCount > 0) {
            console.log(`[Plunk Retry] Retrying once to send email to ${mailOptions.to}...`);
            return sendEmailWithRetry(mailOptions, retryCount - 1);
        }

        throw error;
    }
}
