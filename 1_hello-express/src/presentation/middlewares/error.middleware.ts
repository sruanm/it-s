import type { NextFunction, Request, Response } from 'express'
import { logger } from '../../lib/logger.js'

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
    logger.error(`Catched error: ${err?.customMessage || err}`)

    const statusCode = err?.statusCode || 500;
    const message = err?.customMessage || "Internal server error"

    return res.status(statusCode).json({ error: message })
}