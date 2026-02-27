import {getUserByUserPasswordHash, getUserByUsername, getUserByUserEmail, createUser} from '../model/user.model.js';
import { generateToken, verifyToken } from '../utils/token.utils.js';
import bcrypt from 'bcrypt';
import {randomUUID} from 'node:crypto';
import UserService from '../service/redis.service.js';

export async function login(req, res) {
    const {username, password} = req.body;

    console.log('req.body =', req.body);

    const user = await getUserByUserPasswordHash(username);
    if (!user) {
        return res.status(401).json({code: 401, message: '用户名或密码无效'});
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({code: 401, message: '用户名或密码无效'});
    }

    const token = generateToken({id: user.id, uuid: user.uuid}, '2h');

    res.json({code: 200, message: 'Login successful', data: {token: token}});
}

export async function register(req, res) {
    const {email, username, password, confirmPassword} = req.body;

    console.log('req.body =', req.body);

    const existingUserEmail = await getUserByUserEmail(email);
    if (existingUserEmail) {
        return res.status(409).json({code: 409, message: '邮箱已被注册'});
    }
    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
        return res.status(409).json({code: 409, message: '用户名已被使用'});
    }

    if (password !== confirmPassword) {
        return res.status(400).json({code: 400, message: '密码和确认密码不匹配'});
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const uuid = randomUUID();
    console.log('Generated UUID:', uuid);
    const result = await createUser({
        uuid,
        username,
        email,
        passwordHash // 注意这里的 Key 要对应上
    });

    console.log('User registered with ID:', result);

    res.status(201).json({code: 201, message: '注册成功'});
}

// TODO: 完善错误处理逻辑、还需获取其他信息
export async function getUserInfo(req, res) {
    try {
        const { token } = req.query;
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjEiLCJpYXQiOjE3NjY2NDc1MDgsImV4cCI6MTc2NjY1NDcwOH0.GDIjwR-BBZ0TC-3ZPEixaP9pxzR_eqfd7VRdtZfd_FM
        if (!token) {
            return res.status(400).json({
                code: 400,
                message: '缺少必要参数 token'
            });
        }

        const temp = verifyToken(token);
        console.log('Verified token:', temp);
        const uuid = temp.uuid;

        // 记得加 await！否则逻辑会出错
        const userInfo = await UserService.getUserInfo(uuid);

        if (userInfo) {
            return res.status(200).json({
                code: 200,
                message: '获取成功',
                data: userInfo
            });
        } else {
            // 情况 A：用户不存在
            return res.status(404).json({
                code: 404,
                message: '该用户不存在'
            });
        }
    } catch (error) {
        // 情况 B：服务器内部错误（如 Redis 连接失败、数据库宕机）
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
}

export async function updateUserInfo(req, res) {
    const authHeader = req.headers.authorization;
    const { username, avatar_url } = req.body;
    const token = authHeader.replace('Bearer ', '');
    const temp = verifyToken(token);
    // console.log('Verified token:', temp);
    if (!token) {
        return res.status(401).json({code: 401, message: '未授权'});
    }

    return res.status(200).json({code: 200, message: '更新成功'});
}