import { db } from "../db/database.mjs";

// export async function getAll() {
//   return users;
// }

// export async function createUser(userid, password, name, email) {
//   const user = {
//     id: Date.now().toString(),
//     userid,
//     password,
//     name,
//     email,
//     url: "https://randomuser.me/api/portraits/men/29.jpg",
//   };
//   users = [user, ...users];
//   return user;
// }

// sql 테이블 insert (내가 한 코드)
// export async function createUser(userid, password, name, email,url) {
//   const [result] = await db.query(
//     "insert into users (userid,password, name, email,url) values (?,?,?,?,?)",
//     [userid, password, name, email]
//   );
//   return result[0];
// }

// 강사님 코드
export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "insert into users (userid,password,name,email,url) values (?,?,?,?,?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}

// 내 코드
export async function login(userid, password) {
  const [result] = await db.query("select * from users where userid=?", [
    userid,
    password,
  ]);
  return result[0];
}

export async function findByUserid(userid) {
  return db
    .execute("select * from users where userid=?", [userid])
    .then((result) => result[0][0]);
}

export async function findByid(idx) {
  return db
    .execute("select * from users where idx=?", [idx])
    .then((result) => result[0][0]);
}
