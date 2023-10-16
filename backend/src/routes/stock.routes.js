import { Router } from "express";
import stockController from "../controllers/stock.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", authMiddleware, stockController.createService);
router.get("/", authMiddleware, stockController.findAll);
router.patch("/:id", authMiddleware, stockController.update);
router.put("/:id", authMiddleware, stockController.update);


export default router;
