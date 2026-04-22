import { DataSource } from 'typeorm'
import { env } from '../../lib/env.js'
import { Task, User } from './models.js'

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: env.SQLITE_DB,
    entities: [Task, User],
    synchronize: true,
    logging: true
})