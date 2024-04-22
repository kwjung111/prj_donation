import express from 'express'
import logger from './logger'

const server = express();
const port = 3000;
const env  = process.env.NODE_ENV;

if(env != "DEV" && env != "PRD"){
    logger.error("no env configured!")
}

//body parser 
server.use(express.json())


import signUpRouter from './routes/signUpRouter';
server.use('/signUp', signUpRouter);



server.listen(port, () => {
    logger.info(`server listening at ${port}!`)
}).on('error', err => {
    logger.error(err);
    process.exit(1)
})
