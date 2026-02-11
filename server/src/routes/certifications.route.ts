import express, { Request, Response, NextFunction, Router } from "express"
import { pool } from "../config/db"
import { authMiddleware } from "../middlewares/auth.middleware"

export const certificationsRouter: Router = express.Router()

certificationsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query("SELECT * FROM portfolio.certifications")
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

certificationsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const certificationId = parseInt(req.params.id, 10)
  if (isNaN(certificationId)) {
    res.status(400).json({ error: "Invalid certification ID" })
    return
  }

  try {
    const result = await pool.query(
      "SELECT * FROM portfolio.certifications WHERE id = $1",
      [certificationId],
    )
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Certification not found" })
      return
    }
    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
})

certificationsRouter.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        issuing_organization,
        issue_date,
        expiration_date = null,
        credential_id = null,
        credential_url,
      } = req.body;

      if (!name || !issuing_organization || !issue_date || !credential_url) {
        res.status(400).json({
          error:
            "Campos obrigatórios: name, issuing_organization, issue_date, credential_url",
        });
        return
      }

      const query = `
        INSERT INTO portfolio.certifications
          (name, issuing_organization, issue_date, expiration_date, credential_id, credential_url)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;

      const values = [
        name.trim(),
        issuing_organization.trim(),
        issue_date,
        expiration_date,
        credential_id,
        credential_url.trim(),
      ];

      const { rows } = await pool.query(query, values);
      res.status(201).json(rows[0]);
      return
    } catch (error) {
      next(error);
    }
  },
);

certificationsRouter.put(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const certificationId = Number(req.params.id);
      if (isNaN(certificationId) || certificationId <= 0) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const {
        name,
        issuing_organization,
        issue_date,
        expiration_date,
        credential_id,
        credential_url,
      } = req.body;

      const fields: Record<string, any> = {
        name,
        issuing_organization,
        issue_date,
        expiration_date,
        credential_id,
        credential_url,
      };

      const setClauses: string[] = [];
      const values: any[] = [];
      let index = 1;

      Object.entries(fields).forEach(([column, value]) => {
        if (value !== undefined) {
          setClauses.push(`${column} = $${index}`);
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
        UPDATE portfolio.certifications
        SET ${setClauses.join(", ")}
        WHERE id = $${index}
        RETURNING *;
      `;
      values.push(certificationId);

      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        res.status(404).json({ error: "Certificação não encontrada." });
        return
      }

      res.status(200).json(rows[0]);
      return;
    } catch (error) {
      next(error);
    }
  },
);

certificationsRouter.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const certificationId = Number(req.params.id);
      if (isNaN(certificationId) || certificationId <= 0) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const { rows } = await pool.query(
        "DELETE FROM portfolio.certifications WHERE id = $1 RETURNING *;",
        [certificationId],
      );

      if (rows.length === 0) {
        res.status(404).json({ error: "Certificação não encontrada." });
        return;
      }

      res.status(204).send();
      return;
    } catch (error) {
      next(error);
    }
  },
);
