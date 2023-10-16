import { Router} from "express"
import exitController from "../controllers/exit.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", authMiddleware, exitController.createService);
router.get("/", authMiddleware, exitController.findAll);
router.get("/:id", authMiddleware, exitController.findById);
router.put("/:id", authMiddleware, exitController.update)
router.delete('/:id', authMiddleware, exitController.deleteExit);
export default router;