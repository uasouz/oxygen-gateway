"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
class RedisClient {
    constructor() {
        this.redis = new Redis({ port: 6379, host: process.env.REDIS_ADDR });
    }
}
exports.RedisService = new RedisClient();
//# sourceMappingURL=client.js.map