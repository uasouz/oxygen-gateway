import * as Redis from "ioredis";

class RedisClient {
    redis: Redis.Redis;
    constructor(){
        this.redis = new Redis({port: 6379, host: process.env.REDIS_ADDR});
    }
}

module.exports = new RedisClient();