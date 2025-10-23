import { Request, Response, NextFunction } from "express";
import * as AlertsService from "../services/alerts.service";

export const getAlertsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alerts = await AlertsService.getAlerts();
    res.json(alerts);
  } catch (err) {
    next(err);
  }
};

export const resolveAlertController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const alert = await AlertsService.resolveAlert(id);
    res.json(alert);
  } catch (err) {
    next(err);
  }
};
