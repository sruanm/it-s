import type { NextFunction, Request, Response } from "express";
import { logger } from "../../lib/logger.js";

export function logMidlleware(req: Request, _res: Response, next: NextFunction) {
    logger.info(`[${req.method}] ${req.url}`)
    next();
}