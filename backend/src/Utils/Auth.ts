import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export function generateJWT(username: string) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
      sub: username,
    },
    JWT_SECRET as string
  );
}

export function isJWTValid(token: string) {
  try {
    jwt.verify(token, JWT_SECRET as string);
    return true;
  } catch (err) {
    return false;
  }
}
