import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/parse-product", productRouter);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

export default app;
