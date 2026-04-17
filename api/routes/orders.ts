import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { user_id, products, heroes } = req.body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const orderResult = await client.query(
            "INSERT INTO orders (user_id) VALUES ($1) RETURNING id",
            [user_id]
        );

        const orderId = orderResult.rows[0].id;

        if (products && products.length > 0) {
            for (const product of products) {
                await client.query(
                    "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)",
                    [orderId, product.id, product.quantity]
                );
            }
        }

        if (heroes && heroes.length > 0) {
            for (const hero of heroes) {
                await client.query(
                    "INSERT INTO order_heroes (order_id, hero_id) VALUES ($1, $2)",
                    [orderId, hero.id]
                );
            }
        }
        await client.query("COMMIT");
        res.status(201).json({ orderId });

    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Failed to create the order:", error);
        res.status(500).json({ error: "Failed to create order" });
    } finally {
        client.release();
    }
});

export default router;