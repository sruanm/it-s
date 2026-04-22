import { injector } from "../../dependencies.js";
import type { Task } from "../../persistence/typeorm/models.js";
import { NotFoundError } from "../errors.js";

export async function finishTask(id: number): Promise<Task> {
    const updatedTask = await injector.taskRepository.finishTask(id)
    if (!updatedTask) {
        throw new NotFoundError(`Task ${id}`);
    }
    return updatedTask;
}