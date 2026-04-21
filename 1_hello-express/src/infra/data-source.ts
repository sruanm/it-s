import { DataSource } from 'typeorm'
import { env } from '../lib/env.js'

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: env.SQLITE_DB,
    entities: [],
    synchronize: true,
    logging: true
})