import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefined) {
  // process : Node.js의 전반적인 과정이 들어가있음
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`키 ${key}는 undefined!!`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInsec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
