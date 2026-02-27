import peel from '../config/db.js'
import redis from '../config/rd.js'

const UserService = {
    async getUserInfo(uuid) {
        const cacheKey = `user:info:${uuid}`;

        try {
            const cacheUser = await redis.get(cacheKey);
            if (cacheUser) {
                console.log('---命中Redis缓存---');
                return JSON.parse(cacheUser);
            }

            console.log('---未命中Redis缓存---');
            const [rows] = await peel.query('SELECT id, uuid, username, email, avatar_url FROM users WHERE uuid = ?', [uuid]);
            const userInfo = rows[0];

            if (userInfo) {
                await redis.set(cacheKey, JSON.stringify(userInfo), 'EX', 3600);
            }
            return userInfo;
        } catch (err) {
            console.log('获取用户信息失败：', err);
            throw err;
        }
    },
    async updateUserInfo(uuid, updateData) {
        //TODO 用户是否存在
        const {username, avatarUrl} = updateData;
        const cacheKey = `user:info:${uuid}`;

        try {
            await peel.query(
                'UPDATE users SET username = ?, avatar_url = ? WHERE uuid = ?',
                [username, avatarUrl, uuid]
            );

            await redis.del(cacheKey);
        } catch (err) {
            console.log('更新用户数据失败', err);
            throw err;
        }
    }
}

export default UserService;