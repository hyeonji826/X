import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
// import cors from "cors";
import { db } from "./db/database.mjs";


const app = express();

// app.use(cors());
app.use(express.json());
app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// db안에 정보를 줬던 걸로 연결을 해봄 --> 콜백이 되어 성공/실패 결과가 나옴
db.getConnection().then((connection) => console.log(connection));
app.listen(config.host.port, () => {
  console.log("실행중");
});
