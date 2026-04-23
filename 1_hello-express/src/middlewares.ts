import type { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from './errors.js';
import { jwtProvider } from './jwt.js';
import { AppDataSource } from './data-source.js';
import { User } from './models/entities.js';

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

export async function tokenMiddleware(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]
    const unauthorized = () => next(new UnauthorizedError())

    if (!token) {
        return unauthorized()
    }

    const email = jwtProvider.decode(token);

    if (!email) {
        return unauthorized()
    }

    const repo = AppDataSource.getRepository(User)
    const user = await repo.findOneBy({ email });

    if (!user) {
        return unauthorized()
    }

    (req as any).user = user;

    return next();
}