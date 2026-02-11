import express, { Request, Response, NextFunction, Router } from "express"
import { pool } from "../config/db"

export const dashboardRouter: Router = express.Router()

dashboardRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [projectsResult, certificationsResult, blogsResult] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM portfolio.projects"),
      pool.query("SELECT COUNT(*) FROM portfolio.certifications"),
      pool.query("SELECT COUNT(*) FROM portfolio.blog_posts"),
    ])

    const stats = {
      projects: Number.parseInt(projectsResult.rows[0]?.count ?? "0", 10),
      certifications: Number.parseInt(certificationsResult.rows[0]?.count ?? "0", 10),
      blogs: Number.parseInt(blogsResult.rows[0]?.count ?? "0", 10),
    }

    res.json({ stats })
  } catch (error) {
    next(error)
  }
})
