import express from "express";
import { pool } from "../db";

const router = express.Router();

router.get("/:productId", async (req, res) => {

    const { productId } = req.params
    try {
        const { rows } = await pool.query(
            `SELECT * FROM product_stats WHERE product_id = $1`,
            [productId]
        );
        res.json(rows);
        res.json({ message: "Product stats work" });
    } catch (error) {
        console.error("DB error in stats:", error);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

export default router;