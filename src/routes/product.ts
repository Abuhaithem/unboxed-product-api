import express from "express";
import { parseProduct } from "../controllers/productController";

const router = express.Router();

router.post("/", parseProduct);
export default router;
