import express from "express";
import { pool } from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM products ORDER BY id DESC`
        );
        res.json(rows);
        res.json({ message: "Products route works" });
    } catch (error) {
        console.error("DB error:", error); // add this
        res.status(500).json({ error: "Failed to fetch items/products" });
    }
});
export default router;