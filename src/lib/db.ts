import { createPool, Pool } from 'mysql2/promise'
import mysql from "mysql2";


const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '3306'),
    connectionLimit: 5,
})


let isReady = false

db.on('connection', async () => {
    if (isReady) return
    isReady = true
    console.log(`[DB] Connected to database`)
})

export default db;