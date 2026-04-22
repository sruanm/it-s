import type { CreateTaskDTO, ListTasksQueryParamsDTO } from "../core/dtos/task.dto.js";
import { NotFoundError } from "../core/errors.js";
import { AppDataSource } from "../persistence/data-source.js";
import { Task } from "../persistence/models.js";


export class TaskController {
    static async create(content: CreateTaskDTO): Promise<Task> {
        const repo = AppDataSource.getRepository(Task);

        const newTask = repo.create(content);

        return await repo.save(newTask);
    }

    static async finish(id: number): Promise<Task> {
        const repo = AppDataSource.getRepository(Task);

        const task = await repo.findOneBy({ id });

        if (!task) {
            throw new NotFoundError(`Task ${id}`);
        }

        if (task.status === "finished") {
            return task;
        }

        task.status = "finished";

        return await repo.save(task);
    }

    static async listAll(query: ListTasksQueryParamsDTO): Promise<Task[]> {
        const repo = AppDataSource.getRepository(Task)

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

        return await repo.find({
            where: filters,
            order: orderBy,
            take,
            skip
        });
    }

}