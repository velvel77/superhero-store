import cors from "cors";
import express from "express";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use this after introducing routes
// app.use("/",);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
