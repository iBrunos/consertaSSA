import express from "express";
import productController from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/", authMiddleware, productController.createService);
router.get("/", authMiddleware, productController.findAll);
router.get("/:id", authMiddleware, productController.findById);
router.put("/:id", authMiddleware, productController.update);
router.delete("/:id",authMiddleware, productController.deleteService);
export default router;
