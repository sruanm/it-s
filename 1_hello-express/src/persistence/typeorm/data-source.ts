import { DataSource } from 'typeorm'
import { env } from '../../lib/env.js'
import { Task } from './models/task.model.js'

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: env.SQLITE_DB,
    entities: [Task],
    synchronize: true,
    logging: true
})