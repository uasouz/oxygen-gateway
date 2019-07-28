"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env.NODE_ENV || "development";
const config = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_SCHEMA,
    "host": process.env.DB_ADDR,
    "dialect": "mysql",
    // "charset": "latin1",
    // "collate": "latin1_swedish_ci",
    "logging": (data, benchmark) => { console.log(JSON.stringify({ time: new Date().getTime(), query: data, executionTime: benchmark })); },
    "benchmark": true,
    "pool": {
        "max": 100,
        "min": 1,
        "idle": 10000
    }
};
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.default = sequelize;
//# sourceMappingURL=index.js.map