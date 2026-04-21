import type { TasksRepository } from "./core/ports/task.repository.js"
import { TypeOrmTaskRepository } from "./persistence/typeorm/repositories/typeorm-task.repository.js"

const taskRepository: TasksRepository = new TypeOrmTaskRepository()

export const injector = {
    taskRepository
}