import { Router } from "express";
import { db, contactMessages } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { sendContactNotification } from "../lib/mailer";

const router = Router();

const sseClients = new Set<import("express").Response>();

router.get("/notifications/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  res.write("data: connected\n\n");
  const heartbeat = setInterval(() => res.write(": ping\n\n"), 25000);
  sseClients.add(res);

  req.on("close", () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

function broadcastNewMessage(msg: { id: number; name: string; service?: string | null }) {
  const payload = JSON.stringify({ type: "new_message", id: msg.id, name: msg.name, service: msg.service });
  for (const client of sseClients) {
    client.write(`data: ${payload}\n\n`);
  }
}

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }
  const { name, email, phone, service, budget, message } = parsed.data;
  const [inserted] = await db
    .insert(contactMessages)
    .values({ name, email, phone: phone ?? null, service: service ?? null, budget: budget ?? null, message })
    .returning();

  broadcastNewMessage(inserted);
  sendContactNotification({ name, email, phone, service, budget, message }).catch(() => {});

  res.status(201).json({
    ...inserted,
    createdAt: inserted.createdAt.toISOString(),
  });
});

export default router;
