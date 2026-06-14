import { Router, type Request, type Response, type NextFunction } from "express";
import { db, contactMessages, portfolioProjects, testimonials, siteSettings } from "@workspace/db";
import { AdminLoginBody, AdminMarkContactReadBody } from "@workspace/api-zod";
import { eq, desc, count } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();

const JWT_SECRET = process.env.SESSION_SECRET ?? "growweb-admin-secret-2024";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "growweb@2024";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.slice(7);
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

const PortfolioInputSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string(),
  technologies: z.array(z.string()).default([]),
  liveUrl: z.string().nullable().optional(),
  featured: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional().default(0),
});

const TestimonialInputSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  content: z.string().min(1),
  rating: z.number().int().min(1).max(5).default(5),
  avatarUrl: z.string().nullable().optional(),
});

function serializeProject(p: typeof portfolioProjects.$inferSelect) {
  return { ...p, createdAt: undefined, sortOrder: p.sortOrder };
}

function serializeTestimonial(t: typeof testimonials.$inferSelect) {
  return { ...t, createdAt: undefined };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

router.post("/admin/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const { username, password } = parsed.data;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, username });
});

// ─── Contacts ─────────────────────────────────────────────────────────────────

router.get("/admin/contacts", authMiddleware, async (req, res) => {
  const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  res.json(rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

router.delete("/admin/contacts/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  res.status(204).send();
});

router.patch("/admin/contacts/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = AdminMarkContactReadBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [updated] = await db.update(contactMessages).set({ isRead: parsed.data.isRead }).where(eq(contactMessages.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
});

// ─── Stats ────────────────────────────────────────────────────────────────────

router.get("/admin/stats", authMiddleware, async (req, res) => {
  const [totalContacts] = await db.select({ count: count() }).from(contactMessages);
  const [unreadContacts] = await db.select({ count: count() }).from(contactMessages).where(eq(contactMessages.isRead, false));
  const [totalProjects] = await db.select({ count: count() }).from(portfolioProjects);
  const [totalTestimonials] = await db.select({ count: count() }).from(testimonials);
  res.json({
    totalContacts: Number(totalContacts.count),
    unreadContacts: Number(unreadContacts.count),
    totalProjects: Number(totalProjects.count),
    totalTestimonials: Number(totalTestimonials.count),
  });
});

// ─── Portfolio CRUD ───────────────────────────────────────────────────────────

router.get("/admin/portfolio", authMiddleware, async (req, res) => {
  const rows = await db.select().from(portfolioProjects).orderBy(portfolioProjects.sortOrder, portfolioProjects.id);
  res.json(rows.map(serializeProject));
});

router.post("/admin/portfolio", authMiddleware, async (req, res) => {
  const parsed = PortfolioInputSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [created] = await db.insert(portfolioProjects).values(parsed.data).returning();
  res.status(201).json(serializeProject(created));
});

router.put("/admin/portfolio/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = PortfolioInputSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [updated] = await db.update(portfolioProjects).set(parsed.data).where(eq(portfolioProjects.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(serializeProject(updated));
});

router.delete("/admin/portfolio/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
  res.status(204).send();
});

// ─── Testimonials CRUD ────────────────────────────────────────────────────────

router.get("/admin/testimonials", authMiddleware, async (req, res) => {
  const rows = await db.select().from(testimonials).orderBy(testimonials.id);
  res.json(rows.map(serializeTestimonial));
});

router.post("/admin/testimonials", authMiddleware, async (req, res) => {
  const parsed = TestimonialInputSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [created] = await db.insert(testimonials).values(parsed.data).returning();
  res.status(201).json(serializeTestimonial(created));
});

router.put("/admin/testimonials/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = TestimonialInputSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [updated] = await db.update(testimonials).set(parsed.data).where(eq(testimonials.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(serializeTestimonial(updated));
});

router.delete("/admin/testimonials/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(testimonials).where(eq(testimonials.id, id));
  res.status(204).send();
});

// ─── Site Settings ────────────────────────────────────────────────────────────

async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

router.get("/admin/settings", authMiddleware, async (_req, res) => {
  res.json(await getAllSettings());
});

router.put("/admin/settings", authMiddleware, async (req, res) => {
  const updates = req.body as Record<string, string>;
  if (typeof updates !== "object" || Array.isArray(updates)) {
    res.status(400).json({ error: "Expected object" });
    return;
  }
  for (const [key, value] of Object.entries(updates)) {
    if (typeof value !== "string") continue;
    await db
      .insert(siteSettings)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } });
  }
  res.json(await getAllSettings());
});

// ─── Public Settings ──────────────────────────────────────────────────────────

router.get("/settings", async (_req, res) => {
  res.json(await getAllSettings());
});

export default router;
