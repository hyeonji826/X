import dotenv from 'dotenv';
dotenv.config();

export default {
  db: {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
  port:      process.env.PORT || 3000,
};
