import express    from 'express';
import cors       from 'cors';
import config     from './config.mjs';
import { db }     from './models/db.mjs';

import authRouter from './router/auth.mjs';
import todoRouter from './router/todo.mjs';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth',  authRouter);
app.use('/todos', todoRouter);
app.use(express.static('public'));

(async () => {
  try {
    await db.query('SELECT 1');
    console.log('DB OK');
  } catch (err) {
    console.error('DB 연결 실패:', err);
    process.exit(1);
  }
})();

app.listen(config.port, () => {
  console.log(`🚀 http://localhost:${config.port} 에서 실행 중`);
});
