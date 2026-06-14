import { Router } from "express";
import { db, portfolioProjects } from "@workspace/db";
import { ListPortfolioQueryParams } from "@workspace/api-zod";
import { asc, eq } from "drizzle-orm";

const router = Router();

router.get("/portfolio", async (req, res) => {
  const parsed = ListPortfolioQueryParams.safeParse(req.query);
  const category = parsed.success ? parsed.data.category : undefined;

  let rows;
  if (category) {
    rows = await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.category, category))
      .orderBy(asc(portfolioProjects.sortOrder), asc(portfolioProjects.id));
  } else {
    rows = await db
      .select()
      .from(portfolioProjects)
      .orderBy(asc(portfolioProjects.sortOrder), asc(portfolioProjects.id));
  }

  res.json(
    rows.map((r) => ({
      ...r,
      technologies: r.technologies ?? [],
    })),
  );
});

export default router;
