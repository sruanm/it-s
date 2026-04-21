import { Router } from "express";
import type { CreateTaskDTO } from "../../core/dtos/task.dto.js";
import { createTaskUseCase } from "../../core/use-cases/create-task.js";
import { listAllTasks } from "../../core/use-cases/list-tasks.js";

export const taskRouter = Router()

taskRouter.get("/hello", (_req, res) => res.send("Hello World!"))

taskRouter.post("/", async function (req, res) {
    const body = req.body as Partial<CreateTaskDTO> | undefined;

    if (!body || !body.title || body.title.trim() === '') {
        return res.status(400).json({
            error: "task.title must be set!"
        })
    }

    const record = await createTaskUseCase(body as CreateTaskDTO)

    return res.status(201).json(record);
})


taskRouter.get("/", async function (req, res) {
    const queryParams = req.query as ListTasksQueryParamsDTO;

    const tasks = await listAllTasks(queryParams);

    return res.status(200).json(tasks)
})