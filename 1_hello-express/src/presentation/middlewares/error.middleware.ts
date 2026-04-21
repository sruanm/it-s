import type { NextFunction, Request, Response } from 'express'
import { logger } from '../../lib/logger.js'

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    logger.error(`Catched error: ${err}`)

    return res.status(500).json({ error: "Interval server error!" })
}