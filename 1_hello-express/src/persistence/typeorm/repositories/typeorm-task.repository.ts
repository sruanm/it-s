import type { CreateTaskDTO, ListTasksQueryParamsDTO } from "../../../core/dtos/task.dto.js";
import type { TasksRepository } from "../../../core/ports/task.repository.js";
import { AppDataSource } from "../data-source.js";
import { Task } from "../models/task.model.js";

export class TypeOrmTaskRepository implements TasksRepository {
    private repository = AppDataSource.getRepository(Task)

    async createTask(content: CreateTaskDTO): Promise<Task> {
        const task = this.repository.create(content)

        return await this.repository.save(task)
    }

    async listAll(query: ListTasksQueryParamsDTO): Promise<Task[]> {
        const orderBy: any = {}

        if (query.orderBy === "newest") {
            orderBy.id = "DESC"
        }

        if (query.orderBy === "oldest") {
            orderBy.id = "ASC"
        }

        const filters: any = {}

        if (query.status) {
            filters.status = query.status
        }

        const take = parseInt(query.limit ?? '') || 10;
        const page = parseInt(query.page ?? '') || 0;

        const skip = take * page

        return await this.repository.find({
            where: filters,
            order: orderBy,
            take,
            skip
        });
    }

    async finishTask(id: number): Promise<Task | null> {
        const task = await this.repository.findOneBy({ id });

        if (!task) {
            return null;
        }

        if (task.status === "finished") {
            return task;
        }

        task.status = "finished";

        return await this.repository.save(task);
    }
}