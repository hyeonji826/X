import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

// 스키마 만드는 법
const userSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);

// 컬렉션은 자동으로 복수형 s가 붙기때문에 단수형으로 이름 지어주는 것이 좋다.
// User --> Users
const User = Mongoose.model("User", userSchema);

// 회원가입(사용자 생성)
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findByid(id) {
  return User.findById(id);
}
