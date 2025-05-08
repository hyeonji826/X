import mysql from "mysql2";
// mysql과 JS의 중간다리 역할 ex) query는 sql언어임
import { config } from "../config.mjs";

// createPool DB 연결을 미리 준비해놓은 것
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export const db = pool.promise();
