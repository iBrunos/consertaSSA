import express from "express";
import orderController from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import multer from 'multer';

const router = express.Router();

// Configurando o Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", authMiddleware, upload.single('anexos'), orderController.createService);
router.get("/", authMiddleware, orderController.findAll);
router.get("/:id", authMiddleware, orderController.findById);
router.put("/:id", authMiddleware, orderController.update);
router.delete("/:id",authMiddleware, upload.single('anexos'), orderController.deleteService);
export default router;
