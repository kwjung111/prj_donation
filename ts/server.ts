import express from 'express'
import config from './config'
import logger from './logger'

const server = express();

//body parser 
server.use(express.json())


import signUpRouter from './routes/signUpRouter';
server.use('/signUp', signUpRouter);

const test = {
    a : "test"
    ,b : "notest"
}

server.listen(config.port, () => {
    logger.info(`${config.env} server listening at ${config.port}!`)
}).on('error', err => {
    logger.error(err);
    process.exit(1)
})
