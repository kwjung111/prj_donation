import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
const env = process.env.NODE_ENV;
const { combine, timestamp, label, printf  } = winston.format;

let logLevel = 'debug'

if(env !== 'PRD'){
    logLevel = 'data'
}

const config = {
    levels : {
        error: 0,
        warn : 1,
        info: 2,
        debug: 3,
        data: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: { 
        error: 'red',
        info: 'green',
        warn: 'yellow',
        debug: 'blue',
        data: 'magenta',
        verbose: 'cyan',
        silly: 'grey',
        custom: 'yellow'
    }
}


//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir : string = `${process.cwd()}/logs`;

//* log 출력 포맷 정의 함수
const logFormat = printf((info: winston.Logform.TransformableInfo)  => {
    return `${info.timestamp} [${info.level}] ▶ ${info.message}`; // 날짜 [시스템이름] 로그레벨 메세지
 });

 

const logger = winston.createLogger({
    levels: config.levels,
    level : logLevel,
    format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
    ),
    transports:[
        new winstonDaily({
            level:'info',
            datePattern: "YYYY-MM-DD",
            dirname:logDir,
            filename:"%DATE%.log",
            maxSize:"30m",
            maxFiles: "30d"
        })
    ],
    
    exceptionHandlers: [
    new winstonDaily({
       level: 'error',
       datePattern: 'YYYY-MM-DD',
       dirname: logDir,
       filename: `%DATE%.exception.log`,
       maxFiles: 30,
       zippedArchive: true,
    }),
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat,
        )
    })
 ],
})

winston.addColors(config.colors)


logger.add(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat,
        )
    })
)

export default logger;