import type { Request, Response } from "express";
import nodemailer from "nodemailer";
import { appCOnfig } from "../../config/app.config.js";

export async function submitContact(req: Request, res: Response) {
    const { firstName, lastName, phone, email, message } = req.body || {};

    if (!firstName || !lastName || !phone || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required: firstName, lastName, phone, email, message",
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: appCOnfig.mail.host,
            port: appCOnfig.mail.port,
            secure: appCOnfig.mail.port === 465,
            auth: {
                user: appCOnfig.mail.user,
                pass: appCOnfig.mail.pass,
            },
        });

        const fullName = `${firstName} ${lastName}`.trim();
        const html = `
            <div>
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            </div>
        `;

        await transporter.sendMail({
            from: appCOnfig.mail.from,
            to: appCOnfig.mail.to,
            subject: `Contact form message from ${fullName}`,
            replyTo: email,
            html,
        });

        return res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error?.message || "Failed to send message" });
    }
}


