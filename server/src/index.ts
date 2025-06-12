import express, { Request, Response, NextFunction } from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import { projectsRouter } from "./routes/projects.route";

const app = express()
const port = 2307

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/projects", projectsRouter)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Hendrius' portfolio api is running!" })
})

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const message = error.message || "Erro interno no servidor.";
  console.error(`Erro no método ${req.method} em ${req.originalUrl} - ${message}`);

  res.status(500).json({
    message
  });
  return;
});

app.listen(port, () => {
  console.log(`Portfolio api running on port: ${port}`);
})