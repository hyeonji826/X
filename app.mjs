import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import {config} from "./config.mjs"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());
app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(config.host.port,()=>{
    console.log('실행중')
});
