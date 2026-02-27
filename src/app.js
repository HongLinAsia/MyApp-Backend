import express from 'express';
import pingRoutes from './router/ping.routes.js';
import authRoutes from './router/auth.router.js';
import logRequest from './middleware/log.middleware.js';
import corsOptions from './middleware/cors.middleware.js'
// import bcrypt from 'bcrypt';
// import redis from './config/rd.js'

const app = express();

// app.get("/test", async (req, res) => {
//     try {
//         // 使用实例进行操作
//         await redis.set("user:name", "Gemini", "EX", 3600);
//         const value = await redis.get("user:name");

//         res.send(`Redis 中的值是: ${value}`);
//     } catch (error) {
//         res.status(500).send("Redis 操作失败");
//     }
// });

app.use(express.json());
app.use(corsOptions);
app.use(logRequest);
app.use('/', pingRoutes);
app.use('/auth', authRoutes);

// console.log(await bcrypt.hash('123456', 10));

export default app;