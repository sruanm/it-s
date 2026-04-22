import type { NextFunction, Request, Response } from 'express'

export function logMidlleware(req: Request, _res: Response, next: NextFunction) {
    console.info(`[${req.method}] ${req.url}`)
    next();
}

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
    console.error(`Catched error: ${err?.customMessage || err}`)

    const statusCode = err?.statusCode || 500;
    const message = err?.customMessage || "Internal server error"

    return res.status(statusCode).json({ error: message })
}