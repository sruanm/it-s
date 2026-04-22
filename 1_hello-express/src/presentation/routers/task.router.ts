import { Router } from "express";
import type { CreateTaskDTO, ListTasksQueryParamsDTO } from "../../core/dtos/task.dto.js";
import { TaskController } from "../../controllers/task.controller.js";

export const taskRouter = Router()

taskRouter.post(
    "/",
    async function (req, res, next) {
        try {
            const body = req.body as Partial<CreateTaskDTO> | undefined;

            if (!body || !body.title || body.title.trim() === '') {
                return res.status(400).json({
                    error: "task.title must be set!"
                })
            }

            const record = await TaskController.create(body as CreateTaskDTO)

            return res.status(201).json(record);
        } catch (err) {
            return next(err);
        }
    }
)

taskRouter.get("/", async function (req, res, next) {
    try {
        const queryParams = req.query as ListTasksQueryParamsDTO;

        const tasks = await TaskController.listAll(queryParams);

        return res.status(200).json(tasks)
    } catch (err) {
        return next(err);
    }
})

taskRouter.put("/:id/finish", async function (req, res, next) {
    try {

        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "param id must be a string" })
        }

        const updatedTask = await TaskController.finish(id);

        return res.status(200).json(updatedTask);
    } catch (err) {
        return next(err)
    }
})