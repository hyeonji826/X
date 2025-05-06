const API   = '/todos';
const token = localStorage.getItem('token');
if (!token) location.href = 'login.html';

async function fetchTodos() {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const todos = await res.json();
  document.getElementById('todoList').innerHTML =
    todos.map(t =>
      `<li data-id="${t.todo_id}">
         <input type="checkbox" ${t.is_done?'checked':''}>
         ${t.title}
         <button class="del">🗑️</button>
       </li>`
    ).join('');
}
fetchTodos();

// 할 일 추가
document.getElementById('addForm').addEventListener('submit', async e => {
  e.preventDefault();
  const title = e.target.title.value;
  const desc  = e.target.desc.value;
  await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description: desc })
  });
  e.target.reset();
  fetchTodos();
});
