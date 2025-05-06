import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../models/db.mjs';
import config from '../config.mjs';

export async function signup(req, res) {
  const { username, password } = req.body;
  const [exists] = await db.execute(
    'SELECT user_id FROM users WHERE username = ?', [username]
  );
  if (exists.length)
    return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });

  const hash = await bcrypt.hash(password, 10);
  await db.execute(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hash]
  );
  res.status(201).json({ message: '회원가입 성공' });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username = ?', [username]
  );
  if (!rows.length)
    return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });

  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });

  const token = jwt.sign(
    { user_id: user.user_id, username: user.username },
    config.jwtSecret,
    { expiresIn: '1h' }
  );
  res.json({ token });
}
