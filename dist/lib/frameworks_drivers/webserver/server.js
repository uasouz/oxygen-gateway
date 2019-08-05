"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
// @ts-ignore
const expresspino = require("express-pino-logger");
const user_signup_1 = require("./user_signup");
const user_authentication_1 = require("./user_authentication");
class ExpressServer {
    constructor() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(expresspino());
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
            next();
        });
        this.registerRoutes();
    }
    registerRoutes() {
        this.express.use("/users", user_authentication_1.default);
        this.express.use("/users", user_signup_1.default);
    }
    listen(port) {
        const listener = this.express.listen(port);
        return listener.address();
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=server.js.map