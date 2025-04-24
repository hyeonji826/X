// 사용자
let users = [
  {
    id: "1",
    userid: "apple",
    password: "1111",
    name: "김사과",
    email: "apple@apple.com",
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    userid: "banana",
    password: "2222",
    name: "반하나",
    email: "banana@banana.com",
    url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    userid: "orange",
    password: "3333",
    name: "오렌지",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    userid: "berry",
    password: "4444",
    name: "배애리",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    userid: "melon",
    password: "5555",
    name: "이메론",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

export async function getAll() {
  return users;
}

export async function createUser(userid, password, name, email) {
  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  };
  users = [user, ...users];
  return users;
}

export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

/*
// 회원가입{전부}
export async function create(userid, password, name, email) {
  const finduser = users.find((user) => user.userid === userid);
  if (!finduser) {
    const user = {
      id: Date.now().toString(),
      password,
      userid,
      name,
      email,
    };
    users = [user, ...users];
    return users;
  }else{
    return {message :"이미 있는 아이디입니다."}
  }
}

// 로그인{아이디,패스워드}
export async function login(userid, password) {
  const login = users.find((login) => login.userid === userid);
  if (login.password == password) {
    return login
  }else {
    return {message :"비밀번호가 틀렸습니다."}
  }
  
}

*/
