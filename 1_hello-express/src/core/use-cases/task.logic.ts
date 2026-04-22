import { injector } from "../../dependencies.js";
import type { Task } from "../../persistence/typeorm/models.js";
import type { CreateTaskDTO, ListTasksQueryParamsDTO } from "../dtos/task.dto.js";
import { NotFoundError } from "../errors.js";


export async function finishTaskUseCase(id: number): Promise<Task> {
    const updatedTask = await injector.taskRepository.finishTask(id);
    if (!updatedTask) {
        throw new NotFoundError(`Task ${id}`);
    }
    return updatedTask;
} export function createTaskUseCase(content: CreateTaskDTO): Promise<Task> {
    return injector.taskRepository.createTask(content);
}
export function listAllTasksUseCase(query: ListTasksQueryParamsDTO): Promise<Task[]> {
    return injector.taskRepository.listAll(query);
}

