import mysql from 'mysql2'

const dbcPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    enableKeepAlive: true   //default:false
})

export default dbcPool;