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
router.get('/me',authController.me)

// 로그아웃
router.get('/logout',authController.logout)




export default router