import type { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../core/errors.js';
import { jwtProvider } from '../lib/jwt.js';
import { injector } from '../dependencies.js';

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

    const decodedEmail = jwtProvider.decode(token);

    if (!decodedEmail) {
        return unauthorized()
    }

    const user = await injector.userRepository.findByEmail(decodedEmail);

    if (!user) {
        return unauthorized()
    }

    (req as any).user = user;

    return next();
}