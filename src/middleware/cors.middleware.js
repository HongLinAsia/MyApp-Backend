import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // 你的前端地址
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);