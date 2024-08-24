import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import "../config/passport";

dotenv.config();

const tokenDecode = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

export default tokenDecode;