import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

export default{
    env : process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    logLevel : process.env.LOG_LEVEL || 'silly',
}