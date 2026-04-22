import bcrypt from 'bcryptjs'
import type { SignRequestDTO, LoginResponseDTO, SignupResponseDTO } from '../core/dtos/auth.dto.js';
import { AppError, UnauthorizedError } from '../core/errors.js';
import { jwtProvider } from '../lib/jwt.js';
import { AppDataSource } from '../persistence/data-source.js';
import { User } from '../persistence/models.js';
import { env } from '../lib/env.js';
import type { Request, Response, NextFunction } from 'express';

function parseSignBody(body: Partial<SignRequestDTO> | undefined) {
    const [email, password] = [body?.email?.trim(), body?.password?.trim()]

    if (!email || !password) {
        throw new AppError(400, "email and password must be sent")
    }

    return { email, password }
}

export class AuthController {
    static async signup(req: Request, res: Response<SignupResponseDTO>, next: NextFunction) {
        try {
            const { email, password } = parseSignBody(req.body)

            const repo = AppDataSource.getRepository(User);

            const findedUser = await repo.findOneBy({ email });

            if (findedUser) {
                throw new AppError(409, "email already in use");
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = repo.create({ email, password: hashedPassword })

            const record = await repo.save(newUser)

            return res.status(200).json(record);
        } catch (err) {
            return next(err)
        }
    }

    static async login(req: Request, res: Response<LoginResponseDTO>, next: NextFunction) {
        try {
            const { email, password } = parseSignBody(req.body)

            const repo = AppDataSource.getRepository(User)

            const findedUser = await repo.findOne({
                where: {
                    email
                },
                select: ["id", "email", "password"]
            });
            const unauthorizedErr = new UnauthorizedError("email or password invalid")

            if (!findedUser) {
                throw unauthorizedErr;
            }

            const passwordsEqual = await bcrypt.compare(password, findedUser.password)

            if (!passwordsEqual) {
                throw unauthorizedErr;
            }

            const token = jwtProvider.encode(findedUser.email, env.JWT_EXPIRES_IN_SEC)

            const dto = {
                user: {
                    id: findedUser.id,
                    email
                },
                token,
            };

            return res.status(200).json(dto)
        } catch (err) {
            return next(err);
        }

    }
}