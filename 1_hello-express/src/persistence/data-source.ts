import { DataSource } from 'typeorm'
import { Task, User } from './models.js'
import { env } from '../lib/env.js'

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: env.SQLITE_FILENAME,
    entities: [Task, User],
    synchronize: true,
    logging: true
})