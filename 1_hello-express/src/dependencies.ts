import type { TasksRepository, UserRepository } from "./core/ports/repositories.js"
import { TypeOrmTaskRepository } from "./persistence/repositories/typeorm-task.repository.js"
import { TypeOrmUserRepository } from "./persistence/repositories/typeorm-user.repository.js"

const taskRepository: TasksRepository = new TypeOrmTaskRepository()
const userRepository: UserRepository = new TypeOrmUserRepository()

export const injector = {
    taskRepository,
    userRepository,
}