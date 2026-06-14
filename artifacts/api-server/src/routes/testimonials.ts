import { Router } from "express";
import { db, testimonials } from "@workspace/db";
import { asc } from "drizzle-orm";

const router = Router();

router.get("/testimonials", async (req, res) => {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.id));
  res.json(rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

export default router;
