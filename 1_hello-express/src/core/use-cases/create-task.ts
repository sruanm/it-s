import { injector } from "../../dependencies.js";
import type { Task } from "../../persistence/typeorm/models/task.model.js";
import type { CreateTaskDTO } from "../dtos/task.dto.js";

export function createTaskUseCase(content: CreateTaskDTO): Promise<Task> {
    return injector.taskRepository.createTask(content)
}