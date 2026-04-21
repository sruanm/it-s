import type { CreateTaskDTO } from "../../../core/dtos/task.dto.js";
import type { TasksRepository } from "../../../core/ports/task.repository.js";
import { AppDataSource } from "../data-source.js";
import { Task } from "../models/task.model.js";

export class TypeOrmTaskRepository implements TasksRepository {
    private repository = AppDataSource.getRepository(Task)

    async createTask(content: CreateTaskDTO): Promise<Task> {
        const task = this.repository.create(content)

        return await this.repository.save(task)
    }

    async listAll(): Promise<Task[]> {
        return await this.repository.find();
    }
}