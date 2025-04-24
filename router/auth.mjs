// 사용자
import express from "express"
import * as authController from "../controller/auth.mjs"

const router = express.Router()

// 회원가입
// POST
router.post('/signup',authController.signup)

// 로그인
// POST
router.post('/login',authController.login)

// 로그인 유지




export default router