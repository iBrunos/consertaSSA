import express from "express"
import entryController from "../controllers/entry.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/", authMiddleware, entryController.createService);
router.get("/", authMiddleware, entryController.findAll);
router.get("/:id", authMiddleware, entryController.findById);
router.put("/:id", authMiddleware, entryController.update)
router.delete('/:id', authMiddleware, entryController.deleteEntry);
export default router;