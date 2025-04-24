import * as authRepository from "../data/auth.mjs";

/*
// 회원가입
export async function SignUp(req, res, next) {
  const { userid, password, name, email } = req.body;
  const data = await authRepository.create(userid, password, name, email);
  res.status(200).json(data);
}

// 로그인
export async function Login(req, res, next) {
  const {user,password}= req.body
  const login = await authRepository.login(userid, password);
  if (!login) {
    res.status(404).json({ meassage: `${userid}와 ${password}가 틀렸습니다.` });
  } else {
    res.status(200).json(login);
  }
}
*/

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.createUser(userid, password, name, email);
  if (users) {
    res.status(201).json(users);
  }
}

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    res.status(200).json(`${userid}님 로그인 완료!`);
  } else {
    res
      .status(404)
      .json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요!` });
  }
}
