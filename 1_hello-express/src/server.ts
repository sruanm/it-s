import express from 'express'
import cors from 'cors'
import 'reflect-metadata'

import { AppDataSource } from './persistence/typeorm/data-source.js'
import { logger } from './lib/logger.js'
import { taskRouter } from './presentation/routers/task.router.js'
import { errorMiddleware, logMidlleware } from './presentation/middlewares.js'

async function main() {
    const app = express()
    const PORT = 3000;

    app.use(express.json())
    app.use(cors())

    app.use(logMidlleware)
    app.use(express.static("public"))

    app.use("/tasks", taskRouter);

    app.use(errorMiddleware)

    try {
        await AppDataSource.initialize()
    } catch (err) {
        logger.error(err);
        return;
    }

    app.listen(PORT, () => {
        logger.info("Server up!")
    })
}

main();
