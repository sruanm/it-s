import type { SignRequestDTO } from "../../core/dtos/auth.dto.js";
import { AppDataSource } from "../data-source.js";
import { User } from "../models.js";

export class UserRepository {
    private repository = AppDataSource.getRepository(User);

    async findByEmail(email: string) {
        return await this.repository.findOne({
            where: {
                email
            },
            select: ["id", "email", "password"]
        })
    }

    async createUser(data: SignRequestDTO) {
        const newUser = this.repository.create(data);

        const { password, ...record } = await this.repository.save(newUser)

        return record;
    }
}