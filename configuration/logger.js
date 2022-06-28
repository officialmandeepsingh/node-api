const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, prettyPrint, colorize } = format;


const infoLogger = createLogger({
    format: combine(
        prettyPrint()
      ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './log/logbook.log',
            level: 'info'
        })
    ]
})

infoLogger.stream = {
    write: (message, encoding) => {
        infoLogger.info(message)
    }
}

module.exports = infoLogger