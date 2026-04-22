import { DataSource } from 'typeorm'
import { Task, User } from './models.js'

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "db.sqlite",
    entities: [Task, User],
    synchronize: true,
    logging: true
})