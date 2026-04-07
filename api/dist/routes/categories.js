import express from "express";
import { pool } from "../db.js";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM categories ORDER BY id`);
        res.json(rows);
        res.json({ message: "Category route works" });
    }
    catch (error) {
        console.error("DB error:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});
export default router;
