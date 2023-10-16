import { Router } from "express";
const router = Router();

import { sex } from '../controllers/sex.controller.js'

router.get("/", sex);

export default router;