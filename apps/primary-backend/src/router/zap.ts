import {Router} from  "express"
import { authMiddleware } from "../Middlewares/middlewares";
import { createZap, getZapById } from "../controller/zap";
import { getAllZap } from "../controller/zap";
const router = Router();


router.post("/",authMiddleware, createZap)

router.get("/",authMiddleware, getAllZap)

router.get("/:zapId",authMiddleware, getZapById)

export  const zapRouter = router