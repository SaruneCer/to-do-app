import express from "express";
import cors from "cors";
import { PORT, connectToDb } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

connectToDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
