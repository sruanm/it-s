import type { Task } from "../../persistence/typeorm/models/task.model.js";
import type { CreateTaskDTO, ListTasksQueryParamsDTO } from "../dtos/task.dto.js";

export interface TasksRepository {
    createTask(content: CreateTaskDTO): Promise<Task>;
    listAll(query: ListTasksQueryParamsDTO): Promise<Task[]>;
}