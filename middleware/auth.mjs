import jwt from 'jsonwebtoken';
import config from '../config.mjs';

export default function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token  = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: '토큰이 없습니다.' });

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
}
