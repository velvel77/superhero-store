import express from "express";
import { pool } from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM products ORDER BY id DESC`
        );
        res.json(rows);
    } catch (error) {
        console.error("DB error:", error);
        res.status(500).json({ error: "Failed to fetch items/products" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(
            `SELECT p.*, 
        array_agg(DISTINCT jsonb_build_object('name', c.name)) as categories,
        array_agg(DISTINCT jsonb_build_object('stat_name', ps.stat_name, 'value', ps.value)) as stats
       FROM products p
       LEFT JOIN product_categories pc ON p.id = pc.product_id
       LEFT JOIN categories c ON pc.category_id = c.id
       LEFT JOIN product_stats ps ON p.id = ps.product_id
       WHERE p.id = $1
       GROUP BY p.id`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Product not found (or no products added)" })
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("DB error:", error);
        res.status(500).json({ error: "Failed to fetch single product" });
    }
})

export default router;