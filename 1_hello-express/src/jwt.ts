import jwt from 'jsonwebtoken'
import { env } from './env.js'

export const jwtProvider = {
    encode(data: string, expiresIn: number): string {
        return jwt.sign({ sub: data }, env.JWT_SECRET, { expiresIn })
    },
    decode(data: string): string | null {
        try {
            const decoded = jwt.verify(data, env.JWT_SECRET);
            if (typeof decoded === "string") {
                return null;
            }

            return decoded?.sub ?? null
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}