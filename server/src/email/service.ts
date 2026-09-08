import nodemailer from "nodemailer";

export type MailRecipient = {
    email: string;
    name?: string;
};

export type SendMailInput = {
    to: MailRecipient[];
    subject: string;
    text: string;
};

export type MailResult = {
    configured: boolean;
    sent: boolean;
    messageId?: string;
    error?: string;
};

function smtpConfigured() {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function senderAddress() {
    return process.env.APP_EMAIL_FROM || process.env.SMTP_USER || "no-reply@pdqa.local";
}

export async function sendMail(input: SendMailInput): Promise<MailResult> {
    if (!smtpConfigured()) {
        return {
            configured: false,
            sent: false,
            error: "SMTP is not configured",
        };
    }

    const port = Number(process.env.SMTP_PORT || 587);
    const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: senderAddress(),
        to: input.to.map((recipient) => recipient.name ? `"${recipient.name}" <${recipient.email}>` : recipient.email),
        subject: input.subject,
        text: input.text,
    });

    return {
        configured: true,
        sent: true,
        messageId: info.messageId,
    };
}
