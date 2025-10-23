import { Router } from "express";
import { getAlertsController, resolveAlertController } from "../controllers/alerts.controller";

const router = Router();

router.get("/", getAlertsController);
router.patch("/:id/resolve", resolveAlertController);

export default router;
