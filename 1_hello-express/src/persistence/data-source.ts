import { DataSource } from 'typeorm'
import { Task, User } from './models.js'

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Task, User],
    synchronize: true,
    logging: true
})