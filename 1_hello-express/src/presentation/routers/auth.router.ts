import { Router } from "express";
import type { SignRequestDTO } from "../../core/dtos/auth.dto.js";
import { loginUseCase, signupUseCase } from "../../core/use-cases/auth.logic.js";
import { AppError } from "../../core/errors.js";

export const authRouter = Router();

function parseSignBody(body: Partial<SignRequestDTO> | undefined) {
    const [email, password] = [body?.email?.trim(), body?.password?.trim()]

    if (!email || !password) {
        throw new AppError(400, "email and password must be sent")
    }

    return { email, password }
}

authRouter.post("/signup", async function (req, res) {
    const payload = parseSignBody(req.body)

    const newUser = await signupUseCase(payload);

    return res.status(200).json(newUser);
})

authRouter.post("/login", async function (req, res) {
    const payload = parseSignBody(req.body)

    const user = await loginUseCase(payload);

    return res.status(200).json(user)
})