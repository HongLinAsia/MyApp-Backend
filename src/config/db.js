import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'myapp_db',
  waitForConnections: true,
  connectionLimit: 10,
});

// const pool = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'honglin',
//   password: 'Zhanghl2005.',
//   database: 'myapp_db',
//   waitForConnections: true,
//   connectionLimit: 10,
// });

export default pool;