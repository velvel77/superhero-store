import express from "express";
import { pool } from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM superheroes ORDER BY id DESC`
        );
        res.json(rows);
    } catch (error) {
        console.error("DB error:", error);
        res.status(500).json({ error: "Failed to fetch superheroes" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            `SELECT * FROM superheroes WHERE id = $1`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Superhero not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("DB error: ", error);
        res.status(500).json({ error: "Failed to fetch superhero" });
    }
})

export default router;