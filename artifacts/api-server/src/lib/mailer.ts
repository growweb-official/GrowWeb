import nodemailer from "nodemailer";
import { logger } from "./logger";

function createTransport() {
  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASSWORD"];

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
}) {
  const transport = createTransport();
  if (!transport) {
    logger.info("Email notifications not configured (GMAIL_USER / GMAIL_APP_PASSWORD not set)");
    return;
  }

  const to = process.env["GMAIL_USER"]!;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden;border:1px solid #222">
      <div style="background:#00FF88;padding:20px 28px">
        <h1 style="margin:0;color:#000;font-size:20px;font-weight:800">📬 New GROWWEB Message</h1>
        <p style="margin:4px 0 0;color:#004422;font-size:14px">Someone filled out the contact form</p>
      </div>
      <div style="padding:28px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;color:#888;font-size:13px;width:120px">Name</td><td style="padding:10px 0;font-weight:600;color:#fff">${data.name}</td></tr>
          <tr style="border-top:1px solid #222"><td style="padding:10px 0;color:#888;font-size:13px">Email</td><td style="padding:10px 0"><a href="mailto:${data.email}" style="color:#00FF88">${data.email}</a></td></tr>
          ${data.phone ? `<tr style="border-top:1px solid #222"><td style="padding:10px 0;color:#888;font-size:13px">Phone</td><td style="padding:10px 0;color:#fff"><a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="color:#00FF88">${data.phone}</a></td></tr>` : ""}
          ${data.service ? `<tr style="border-top:1px solid #222"><td style="padding:10px 0;color:#888;font-size:13px">Service</td><td style="padding:10px 0;color:#fff">${data.service}</td></tr>` : ""}
          ${data.budget ? `<tr style="border-top:1px solid #222"><td style="padding:10px 0;color:#888;font-size:13px">Budget</td><td style="padding:10px 0;color:#fff">${data.budget}</td></tr>` : ""}
        </table>
        <div style="margin-top:20px;padding:16px;background:#111;border-radius:8px;border-left:3px solid #00FF88">
          <p style="margin:0;font-size:13px;color:#888;margin-bottom:6px">Message</p>
          <p style="margin:0;color:#fff;line-height:1.6">${data.message.replace(/\n/g, "<br>")}</p>
        </div>
        <div style="margin-top:24px;display:flex;gap:12px">
          <a href="mailto:${data.email}" style="display:inline-block;background:#00FF88;color:#000;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px">Reply via Email</a>
          ${data.phone ? `<a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="display:inline-block;background:#25D366;color:#fff;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px">Reply on WhatsApp</a>` : ""}
        </div>
      </div>
      <div style="padding:16px 28px;background:#111;border-top:1px solid #222;font-size:12px;color:#555">
        GROWWEB Agency · growweb.website · This email was sent automatically when a new contact form was submitted.
      </div>
    </div>
  `;

  try {
    await transport.sendMail({
      from: `"GROWWEB Notifications" <${to}>`,
      to,
      subject: `🔔 New Lead: ${data.name} — ${data.service ?? "Contact Form"}`,
      html,
      text: `New contact from ${data.name} (${data.email})\n\nPhone: ${data.phone ?? "—"}\nService: ${data.service ?? "—"}\nBudget: ${data.budget ?? "—"}\n\nMessage:\n${data.message}`,
    });
    logger.info({ to, from: data.email }, "Contact notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send contact notification email");
  }
}
