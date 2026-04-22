import { UserRepository } from "./persistence/repositories/user.repository.js"

const userRepository = new UserRepository()

export const injector = {
    userRepository,
}