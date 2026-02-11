import express, { Request, Response, NextFunction, Router } from "express"
import { pool } from "../config/db"
import { authMiddleware } from "../middlewares/auth.middleware"

export const projectsRouter: Router = express.Router()

projectsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query("SELECT * FROM portfolio.projects")
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

projectsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const projectId = parseInt(req.params.id, 10)
  if (isNaN(projectId)) {
    res.status(400).json({ error: "Invalid project ID" })
    return
  }

  try {
    const result = await pool.query("SELECT * FROM portfolio.projects WHERE id = $1", [projectId])
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Project not found" })
      return
    }
    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
})

projectsRouter.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        summary,
        description,
        category,
        technologies,
        star_method,
        github_url,
        demo_url = null,
        images = [],
      } = req.body;

      if (
        !name ||
        !summary ||
        !description ||
        !category ||
        !technologies ||
        !star_method ||
        !github_url
      ) {
        res.status(400).json({
          error:
            "Campos obrigatórios: name, summary, description, category, technologies, star_method, github_url",
        });
        return
      }

      if (!Array.isArray(technologies)) {
        res
          .status(400)
          .json({ error: "`technologies` deve ser um array JSON" });
        return
      }
      if (!Array.isArray(images)) {
        res
          .status(400)
          .json({ error: "`images` deve ser um array JSON" });
        return
      }
      if (typeof star_method !== "object" || Array.isArray(star_method)) {
        res
          .status(400)
          .json({ error: "`star_method` deve ser um objeto JSON" });
        return
      }

      const query = `
        INSERT INTO portfolio.projects
          (name, summary, description, category, technologies, star_method, github_url, demo_url, images)
        VALUES
          ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7, $8, $9::jsonb)
        RETURNING *;`;

      const values = [
        name.trim(),
        summary.trim(),
        description.trim(),
        category.trim(),
        JSON.stringify(technologies),
        JSON.stringify(star_method),
        github_url.trim(),
        demo_url,
        JSON.stringify(images),
      ];

      const { rows } = await pool.query(query, values);
      res.status(201).json(rows[0]);
      return
    } catch (error) {
      next(error);
    }
  },
);

projectsRouter.put(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = Number(req.params.id);
      if (isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const {
        name,
        summary,
        description,
        category,
        technologies,
        star_method,
        github_url,
        demo_url,
        images,
      } = req.body;

      const fields: Record<string, any> = {
        name,
        summary,
        description,
        category,
        technologies:
          technologies !== undefined ? JSON.stringify(technologies) : undefined,
        star_method:
          star_method !== undefined ? JSON.stringify(star_method) : undefined,
        github_url,
        demo_url,
        images: images !== undefined ? JSON.stringify(images) : undefined,
      };

      const setClauses: string[] = [];
      const values: any[] = [];
      let index = 1;

      Object.entries(fields).forEach(([column, value]) => {
        if (value !== undefined) {
          setClauses.push(
            column === "technologies" ||
              column === "star_method" ||
              column === "images"
              ? `${column} = $${index}::jsonb`
              : `${column} = $${index}`,
          );
          values.push(value);
          index++;
        }
      });

      if (setClauses.length === 0) {
        res
          .status(400)
          .json({ error: "Nenhum campo válido enviado para atualização." });
        return
      }

      setClauses.push(`updated_at = now()`);
      const query = `
        UPDATE portfolio.projects
        SET ${setClauses.join(", ")}
        WHERE id = $${index}
        RETURNING *;
      `;
      values.push(projectId);

      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        res.status(404).json({ error: "Projeto não encontrado." });
        return
      }

      res.status(200).json(rows[0]);
      return;
    } catch (error) {
      next(error);
    }
  },
);

projectsRouter.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = Number(req.params.id);
      if (isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const { rows } = await pool.query(
        "DELETE FROM portfolio.projects WHERE id = $1 RETURNING *;",
        [projectId],
      );

      if (rows.length === 0) {
        res.status(404).json({ error: "Projeto não encontrado." });
        return;
      }

      res.status(204).send();
      return;
    } catch (error) {
      next(error);
    }
  },
);
