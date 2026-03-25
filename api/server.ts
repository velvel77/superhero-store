import cors from "cors";
import express from "express";
import usersRouter from "./routes/users.js"

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
