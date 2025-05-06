import { db } from '../models/db.mjs';

export async function getTodos(req, res) {
  const [rows] = await db.execute(
    'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.user_id]
  );
  res.json(rows);
}

export async function getTodo(req, res) {
  const { id } = req.params;
  const [rows] = await db.execute(
    'SELECT * FROM todos WHERE todo_id = ? AND user_id = ?',
    [id, req.user.user_id]
  );
  res.json(rows);
  if (!rows.length) return res.status(404).json({ message: '할 일이 없습니다.' });
  res.json(rows[0]);
}

export async function addTodo(req, res) {
  const { title, description } = req.body;
  const [result] = await db.execute(
    'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)',
    [req.user.user_id, title, description]
  );
  res.status(201).json({ todo_id: result.insertId, title, description, is_done: 0 });
}

export async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, description, is_done } = req.body;
  await db.execute(
    'UPDATE todos SET title=?, description=?, is_done=? WHERE todo_id=? AND user_id=?',
    [title, description, is_done ? 1 : 0, id, req.user.user_id]
  );
  res.json({ message: '수정 완료' });
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  await db.execute(
    'DELETE FROM todos WHERE todo_id=? AND user_id=?',
    [id, req.user.user_id]
  );
  res.json({ message: '삭제 완료' });
}
