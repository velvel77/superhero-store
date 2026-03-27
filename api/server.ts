import cors from "cors";
import express from "express";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/categories.js";
import superheroRouter from "./routes/superheroes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/superheroes", superheroRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
