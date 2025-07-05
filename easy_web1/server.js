// File: server.js
// 简单的 Node.js + Express + MySQL 用户登录注册 API
// 使用 bcrypt 进行密码加密，使用 JWT 生成令牌
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// 连接数据库（确保已有 db 对象）
// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const app = express();

// 创建 Express 应用
const app = express();
app.use(cors());                // 允许跨域
app.use(express.json());        // 解析 JSON


// MySQL 连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'viz_platform',
  waitForConnections: true,
  connectionLimit: 10
});

// 登录接口
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const [[user]] = await pool.query('SELECT * FROM users WHERE username=?', [username]);
  if (!user) return res.status(401).json({ msg: '用户不存在' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ msg: '密码错误' });

  const token = jwt.sign({ id: user.id, username }, 'secret', { expiresIn: '2h' });
  res.json({ token });
});

// 注册接口
app.post('/api/register', async (req, res) => {
  try{
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: '参数缺失' });

    // 检查用户名是否已存在
    const [[existingUser]] = await pool.query('SELECT * FROM users WHERE username=?', [username]);
    if (existingUser) return res.status(409).json({ msg: '用户名已存在' });

    // 密码加密
    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);

    res.json({ msg: '注册成功' });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ msg: '服务器错误' });
  }
});

// 写入日志 API
app.post('/api/log', (req, res) => {
  const { username, filename, chart_type, action } = req.body;
  const sql = 'INSERT INTO logs (username, filename, chart_type, action) VALUES (?, ?, ?, ?)';
  pool.query(sql, [username, filename, chart_type, action], (err) => {
    if (err) return res.status(500).json({ msg: '写入失败' });
    res.json({ msg: 'ok' });
  });
});

// 查询日志 API
app.get('/api/logs', (req, res) => {
  pool.query('SELECT * FROM logs ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ msg: '查询失败' });
    res.json(rows);
  });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
