import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import config from '../config'
const { combine, timestamp, label, printf } = winston.format;

// log 출력 포맷
const logFormat = printf((info: winston.Logform.TransformableInfo) => {
    if(info.stack) return `${info.timestamp} [${info.level}] ▶  ${info.message}\n${info.stack}`
    else return `${info.timestamp} [${info.level}] ▶ ${info.message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

// 로그 파일 경로 : root/logs 폴더
const logDir: string = `${process.cwd()}/logs`;

const consoleFormat = combine(
    winston.format.errors({stack : true}),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.json(),
    logFormat,
)

const transports = [];
if (config.env !== 'DEV') {
    transports.push(
        new winston.transports.Console()
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: consoleFormat
        })
    )
}

transports.push(
    new winstonDaily({
        level: 'info',
        datePattern: "YYYY-MM-DD",
        dirname: logDir,
        filename: "%DATE%.log",
        maxFiles: 30
    })
)

const logger = winston.createLogger({
    level: config.logLevel,
    levels: winston.config.npm.levels,
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({stack : true}),
        winston.format.splat(),
        winston.format.json(),
        logFormat,
    ),
    transports: transports,
    exceptionHandlers: [
        new winston.transports.Console({format: consoleFormat}
        ),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
        }),
    ],
})


export default logger;