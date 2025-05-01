// post.html
window.addEventListener("DOMContentLoaded", fetchPosts);

async function fetchPosts() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("로그인 재시도하세요!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/posts", {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);

    const posts = await response.json();
    const ul = document.getElementById("postList");
    ul.innerHTML = "";

    posts.forEach(p => {
      const li = document.getElementById("li");
      li.textContent = `${p.id}. ${p.title}`;
      ul.appendChild(li);
    });
  } catch (err) {
    console.error("포스트 불러오기 실패", err);
  }
}

