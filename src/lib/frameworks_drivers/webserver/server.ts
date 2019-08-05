import bodyParser = require("body-parser");
import * as express from 'express'
// @ts-ignore
import * as expresspino from "express-pino-logger"
import IServer from "./server_interface";
import user_signup from "./user_signup";
import user_authentication from "./user_authentication";

export default class ExpressServer implements IServer {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.express.use(bodyParser.json());
        this.express.use(expresspino());
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