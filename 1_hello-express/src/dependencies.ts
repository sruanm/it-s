import { TaskRepository } from "./persistence/repositories/task.repository.js"
import { UserRepository } from "./persistence/repositories/user.repository.js"

const taskRepository = new TaskRepository()
const userRepository = new UserRepository()

export const injector = {
    taskRepository,
    userRepository,
}