import path from "path";
import dotenv from "dotenv";
const envFile = process.env.NODE_ENV === 'development' ? ".env" : ".env.production";
dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

export const vars = {
  IP: process.env.IP,
  PORT: process.env.PORT,
  PASS: process.env.PASS,
  USERS: process.env.USERS,
  DBASE: process.env.DBASE,
  JWT_SECRET: process.env.JWT_SECRET,
  UPLOAD_FOLDER: process.env.UPLOAD_FOLDER || path.join(__dirname, "../../", "uploads"),
  ALLOWED_FILE_TYPES: process.env.ALLOWED_FILE_TYPES,
};

console.log(vars);
