// signup.html
async function SignUp(event) {
  event.preventDefault();
  const signup_userid = document.getElementById("signup_userid").value.trim();
  const signup_password = document
    .getElementById("signup_password")
    .value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const result = document.getElementById("result");

  if (!signup_userid || !signup_password || !name || !email) {
    alert("모든 값을 입력해주세요!");
    return;
  }
  try {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: signup_userid,
        password: signup_password,
        name,
        email,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("회원가입 성공: " + data.message);
      document.getElementById("result").innerText = JSON.stringify(data);
      window.location.href = "./login.html";
    } else {
      alert("회원가입 실패: " + data.message);
    }
  } catch (err) {
    alert("실패😂" + err.message);
  }
}

// login.html
async function Login(event) {
  event.preventDefault();
  const login_userid = document.getElementById("login_userid").value.trim();
  const login_password = document.getElementById("login_password").value.trim();

  if (!login_userid || !login_password) {
    alert("아이디와 비번을 입력해주세요");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid: login_userid, password: login_password }),
    });
    const data = await response.json();

    if (response.ok) {
      alert("로그인 성공" + data.message);
      document.getElementById("result").innerText = JSON.stringify(data);
      localStorage.setItem("userid", login_userid);
      localStorage.setItem("token", data.token);
      window.location.href = "./post.html";
    } else {
      alert("로그인 실패");
    }
  } catch (err) {
    alert("서버 연결 실패");
  }
}

// post.html
if (window.location.pathname.endsWith("post.html")) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  } else {
    fetch("http://localhost:8080/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("게시물 가져오기 실패");
        return res.json();
      })
      .then((posts) => {
        const listEl = document.getElementById("postsList");
        posts.forEach((post) => {
          const li = document.createElement("li");
          li.innerHTML = `<img src="${post.url}" alt="${
            post.name
          }" width="50" style="vertical-align:middle; margin-right:8px;"/>
          <strong>${post.name}(@${post.userid})</strong>
          <p>${post.text}</p>
          <small>${new Date(post.createdAt).toLocaleString()}</small>
        `;
          listEl.appendChild(li);
        });
      })
      .catch((err) => {
        console.error(err);
        alert("게시물 불러오는 중 오류 발생");
      });
  }
}
