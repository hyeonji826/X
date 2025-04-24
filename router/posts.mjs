// 삭제 or 수정
import express from "express";

const router = express.Router();

// 모든 포스트 가져오기
// 해당 아이디에 대한 포스트 가져오기
// GET
// http://127.0.0.1:8080/posts/
// http://127.0.0.1:8080/posts?userid=apple

// 글번호에 대한 포스트 가져오기
// GET
// http://127.0.0.1:8080/posts/:id

// 포스트 쓰기
// POST
// http://127.0.0.1:8080/posts
// json 형태로 입력 후 저장

// 포스트 수정하기
// PUT
// http://127.0.0.1:8080/posts/:id
// json 형태로 입력 후 저장

// 포스트 삭제하기
// DELETE
// http://127.0.0.1:8080/posts/:id

export default router;
