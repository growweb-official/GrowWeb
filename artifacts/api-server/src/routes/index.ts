import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import portfolioRouter from "./portfolio";
import testimonialsRouter from "./testimonials";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(portfolioRouter);
router.use(testimonialsRouter);
router.use(adminRouter);

export default router;
