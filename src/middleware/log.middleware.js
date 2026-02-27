export default function logRequest(req, res, next) {
    const start = Date.now(); // 记录请求开始时间

    // 当响应结束时触发
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${res.statusCode}] ${req.method} ${req.originalUrl} - ${duration}ms`);
    });

    next(); // 继续处理请求
}