import type { Task } from "../../persistence/typeorm/models/task.model.js";
import type { CreateTaskDTO } from "../dtos/task.dto.js";

export interface TasksRepository {
    createTask(content: CreateTaskDTO): Promise<Task>;
    listAll(): Promise<Task[]>;
}