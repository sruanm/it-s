import { injector } from "../../dependencies.js";
import type { Task } from "../../persistence/typeorm/models/task.model.js";
import type { ListTasksQueryParamsDTO } from "../dtos/task.dto.js";

export function listAllTasks(query: ListTasksQueryParamsDTO): Promise<Task[]> {
    return injector.taskRepository.listAll(query)
}