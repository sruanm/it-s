import { injector } from "../../dependencies.js";
import type { Task } from "../../persistence/typeorm/models/task.model.js";

export function listAllTasks(): Promise<Task[]> {
    return injector.taskRepository.listAll()
}