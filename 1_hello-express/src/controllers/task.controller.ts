import { NotFoundError } from "../errors.js";
import { AppDataSource } from "../data-source.js";
import { Task, User } from "../models/entities.js";

export interface CreateTaskDTO {
    title: string;
    description?: string
}

export interface ListTasksQueryParamsDTO extends Partial<{
    orderBy: string;

    limit: string;
    page: string;

    status: string;
}> { }


export class TaskController {
    static async create(content: CreateTaskDTO, authenticatedUser: User): Promise<Omit<Task, "user">> {
        const repo = AppDataSource.getRepository(Task);

        const newTask = repo.create({ ...content, user: authenticatedUser });

        const { user, ...task } = await repo.save(newTask);

        return task;
    }

    static async finish(id: number, user: User): Promise<Task> {
        const repo = AppDataSource.getRepository(Task);

        const task = await repo.findOneBy({ id, user });

        if (!task) {
            throw new NotFoundError(`Task ${id}`);
        }

        if (task.status === "finished") {
            return task;
        }

        task.status = "finished";

        return await repo.save(task);
    }

    static async listAll(query: ListTasksQueryParamsDTO, user: User): Promise<Task[]> {
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
            where: {
                user,
                ...filters
            },
            relations: {
                user: false
            },
            order: orderBy,
            take,
            skip
        });
    }
}