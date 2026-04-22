import { Router } from "express";
import type { CreateTaskDTO, ListTasksQueryParamsDTO } from "../../core/dtos/task.dto.js";
import { createTaskUseCase } from "../../core/use-cases/task.logic.js";
import { listAllTasksUseCase } from "../../core/use-cases/task.logic.js";
import { finishTaskUseCase } from "../../core/use-cases/task.logic.js";

export const taskRouter = Router()

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

    const tasks = await listAllTasksUseCase(queryParams);

    return res.status(200).json(tasks)
})

taskRouter.put("/:id/finish", async function (req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "param id must be a string" })
    }

    const updatedTask = await finishTaskUseCase(id);

    return res.status(200).json(updatedTask);
})