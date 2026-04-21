import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { AppDataSource } from './infra/data-source.js'
import { logger } from './lib/logger.js'

async function main() {
    const app = express()
    app.use(express.json())
    app.use(cors())

    try {
        await AppDataSource.initialize()
    } catch (err) {
        logger.error(err);
        return;
    }

    app.listen(3000, () => {
        logger.info("Hello!")
    })
}

main();
