import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

const secretKey = config.jwt.secretKey;
const bcryptSaltRounds = config.bcrypt.saltRounds;
const jwtExpiresInDays = config.jwt.expiresInsec;

async function createJwtToken(idx) {
  return jwt.sign({ idx }, secretKey, { expiresIn: jwtExpiresInDays });
}

export async function signup(req, res, next) {
  const { userid, password, name, email, url } = req.body;

  // 회원 중복 체크
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res
      .status(409)
      .json({ message: `${userid}과 동일한 아이디가 이미 존재합니다.` });
  }

  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);
  // 객체로 보내기 위해 {}로 감싸줘야한다.
  const users = await authRepository.createUser({
    userid,
    password: hashed,
    name,
    email,
    url,
  });
  const token = await createJwtToken(users.idx);
  console.log(token);
  if (users) {
    res.status(201).json({ message: "회원가입 완료!", token, userid });
  }
}

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.findByUserid(userid);
  if (!user) {
    res.status(402).json(`${userid} 아이디를 찾을 수 없음`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(402).json({ message: "아이디 또는 비밀번호 확인" });
  }

  const token = await createJwtToken(user.idx);
  res.status(200).json({ token, userid });
}

export async function verify(req, res, next) {
  const id = req.id;
  if (id) {
    res.status(200).json(id);
  } else {
    res.status(401).json({ message: "사용자 인증 실패" });
  }
}
// verify 는 미들웨어 auth.mjs에서 인증처리함

export async function me(req, res, next) {
  const user = await authRepository.findByid(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없음" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}
