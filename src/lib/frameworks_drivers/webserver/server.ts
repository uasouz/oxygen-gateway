import bodyParser = require("body-parser");
import * as express from 'express'
import * as winston from 'winston';
// @ts-ignore
import * as expressWinston from 'express-winston';
import IServer from "./server_interface";
import user_signup from "./user_signup";
import user_authentication from "./user_authentication";

export default class ExpressServer implements IServer {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.express.use(bodyParser.json());
        this.express.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                // winston.format.colorize(),
                winston.format.json()
            ),
            level: 'info',
            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (req: any, res: any) {
                return false;
            } // optional: allows to skip some log messages based on request and/or response
        }));
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
            next();
        });
        this.registerRoutes()
    }

    registerRoutes() {
        this.express.use("/users", user_authentication);
        this.express.use("/users", user_signup);
    }

    listen(port: number | string) {

        const listener = this.express.listen(port);
        return listener.address()

    }
}