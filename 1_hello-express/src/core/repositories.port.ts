import type { Task, User } from "../persistence/typeorm/models.js";
import type { SignRequestDTO, SignResponseDTO } from "./dtos/auth.dto.js";
import type { CreateTaskDTO, ListTasksQueryParamsDTO } from "./dtos/task.dto.js";

export interface TasksRepository {
    createTask(content: CreateTaskDTO): Promise<Task>;
    listAll(query: ListTasksQueryParamsDTO): Promise<Task[]>;
    finishTask(id: number): Promise<Task | null>;
}

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
    createUser(data: SignRequestDTO): Promise<SignResponseDTO>;
}