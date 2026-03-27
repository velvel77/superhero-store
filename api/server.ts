import cors from "cors";
import express from "express";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());


app.use("/users", usersRouter);
app.use("/products", productsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
