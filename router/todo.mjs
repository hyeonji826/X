import express from 'express';
import auth from '../middleware/auth.mjs'
import {
  getTodos, getTodo, addTodo, updateTodo, deleteTodo
} from '../controller/todo.mjs';

const router = express.Router();
router.use(auth);

router.get('/',   getTodos);
router.get('/:id', getTodo);
router.post('/',  addTodo);
router.put('/:id',updateTodo);
router.delete('/:id',deleteTodo);

export default router;
