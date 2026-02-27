import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

// 生成 JWT token
export function generateToken(payload, expiresIn = '2h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// 验证 JWT token
export function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}