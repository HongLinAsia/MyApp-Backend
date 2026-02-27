import Redis from "ioredis";

const redis = new Redis({
    port: 6379,
    host: "127.0.0.1",
    password: "zhanghl2005",
    db: 0
})

redis.on("connect", () => {
    console.log("Redis 已连接");
});

redis.on("error", (err) => {
    console.error("Redis 连接错误:", err);
});

redis.on("close", () => {
    console.log("Redis 连接已关闭");
});

export default redis;