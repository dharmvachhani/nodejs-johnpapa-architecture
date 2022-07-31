import "reflect-metadata"
import { DataSource } from "typeorm"

export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ["src/**/entity.ts"],
    migrations: [],
    subscribers: [],
})
