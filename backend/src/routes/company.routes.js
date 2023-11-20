import express from "express";
import companyController from "../controllers/company.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/", authMiddleware, companyController.createService);
router.get("/", authMiddleware, companyController.findAll);
router.get("/:id", authMiddleware, companyController.findById);
router.put("/:id", authMiddleware, companyController.update);
router.delete("/:id",authMiddleware, companyController.deleteService);
export default router;
