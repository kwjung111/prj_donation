import express from 'express'
import logger from './logger'
const server = express()
const port = 3000;
const env  = process.env.NODE_ENV

if(env != "DEV" && env != "PRD"){
    logger.error("no env configured!")
}


server.listen(port, () => {
    logger.info(`server listening at ${port}!`)
});


//TEST
import{ createUser } from './svc/authSvc'

const user = {
    id : 1,
    
}

createUser()