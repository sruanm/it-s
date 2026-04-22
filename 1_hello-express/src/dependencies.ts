import type { TasksRepository, UserRepository } from "./core/repositories.port.js"
import { TypeOrmTaskRepository } from "./persistence/typeorm/repositories/typeorm-task.repository.js"
import { TypeOrmUserRepository } from "./persistence/typeorm/repositories/typeorm-user.repository.js"

const taskRepository: TasksRepository = new TypeOrmTaskRepository()
const userRepository: UserRepository = new TypeOrmUserRepository()

export const injector = {
    taskRepository,
    userRepository,
}