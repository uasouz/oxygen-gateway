"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
exports.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ]
});
//# sourceMappingURL=index.js.map