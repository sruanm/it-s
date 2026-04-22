import express from 'express'
import cors from 'cors'
import 'reflect-metadata'

import { AppDataSource } from './persistence/data-source.js'
import { taskRouter } from './routers/task.router.js'
import { errorMiddleware, logMidlleware, tokenMiddleware } from './middlewares.js'
import { authRouter } from './routers/auth.router.js'

async function main() {
    const app = express()
    const PORT = 3000;

    app.use(express.json())
    app.use(cors())

    app.use(logMidlleware)
    app.use(express.static("public"))

    app.use("/auth", authRouter);

    app.use(tokenMiddleware);
    app.use("/tasks", taskRouter);

    app.use(errorMiddleware)

    try {
        await AppDataSource.initialize()
    } catch (err) {
        console.error(err);
        return;
    }

    app.listen(PORT, () => {
        console.info("Server up!")
    })
}

main();
