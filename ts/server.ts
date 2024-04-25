import 'reflect-metadata'
import express from 'express'
import config from './config'
import logger from './loaders/logger'


async function start() {
    const server = express();

    await require('./loaders').default({ expressApp: server });

    server.listen(config.port, () => {
        logger.info(`${config.env} server listening at ${config.port}!`)
    }).on('error', err => {
        logger.error(err);
        process.exit(1)
    })
}

start();
