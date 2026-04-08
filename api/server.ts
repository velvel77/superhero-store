import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

import cors from "cors";
import express from "express";
import categoryRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";
import superheroRouter from "./routes/superheroes.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

console.log("ENV PORT:", process.env.PORT);

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/superheroes", superheroRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
