import { Pool } from "pg"
import { vars } from "./dotenv"

export const pool = new Pool({
  user: vars.USERS,
  host: vars.IP,
  database: vars.DBASE,
  password: vars.PASS,
  port: 5432,
});

const connectDatabase = async () => {
  const client = await pool.connect();

  try {
    if (process.env.NODE_ENV === "development") {
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  } finally {
    client.release();
    if (process.env.NODE_ENV === "development") {
      console.log("Client released");
    }
  }
}
connectDatabase();