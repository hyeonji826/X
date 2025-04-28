// 사용자
import express from "express";
import * as authController from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자 이상 입력")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("특수문자는 사용불가"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("최소 8자 이상 입력"),
  validate, // 아이디 조건 통과 -> 비밀번호 조건 통과 -> validate로 통과
];

const validateSignup = [
  ...validateLogin, // 로그인조건이랑 동일하게 다 만족되야함
  body("name").trim().notEmpty().withMessage("이름 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원가입
// POST
router.post("/signup", validateSignup, authController.signup);

// 로그인
// POST
router.post("/login", validateLogin, authController.login);

// 로그인 유지

export default router;
