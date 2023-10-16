import { Router} from "express"
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import multer from 'multer';
const router = Router();

// Configurando o Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", authMiddleware, upload.single('avatar'), userController.createService);
router.get("/", authMiddleware, userController.findAll);
router.get("/:id", authMiddleware, userController.findById);
router.put("/:id", authMiddleware, upload.single('avatar'), userController.update)
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;
