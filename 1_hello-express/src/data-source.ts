import { DataSource } from 'typeorm'
import { Tag, Task, User } from './models/entities.js'
import { env } from './env.js'

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: env.SQLITE_FILENAME,
    entities: [Tag, Task, User],
    synchronize: true,
    logging: true
})