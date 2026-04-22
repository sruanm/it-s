import { injector } from "../../dependencies.js";
import type { SignRequestDTO, SignResponseDTO } from "../dtos/auth.dto.js";
import { AppError, UnauthorizedError } from "../errors.js";
import bcrypt from 'bcryptjs'

export async function signupUseCase({ email, password }: SignRequestDTO): Promise<SignResponseDTO> {
    const userRepository = injector.userRepository

    const findedUser = await userRepository.findByEmail(email);

    if (findedUser) {
        throw new AppError(409, "email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return await userRepository.createUser({ email, password: hashedPassword })
}

export async function loginUseCase({ email, password }: SignRequestDTO): Promise<SignResponseDTO> {
    const findedUser = await injector.userRepository.findByEmail(email);
    const unauthorizedErr = new UnauthorizedError("email or password invalid")

    if (!findedUser) {
        throw unauthorizedErr;
    }

    const passwordsEqual = await bcrypt.compare(password, findedUser.password)

    if (!passwordsEqual) {
        throw unauthorizedErr;
    }

    return {
        id: findedUser.id,
        email
    };
}