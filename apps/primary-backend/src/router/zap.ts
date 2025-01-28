import {Router} from  "express"
import { authMiddleware } from "../Middlewares/middlewares";
const router = Router();

router.post("/", (req, res) => {
   console.log("create a zap")
})

router.get("/",authMiddleware, (req, res) => {
   console.log("get all zap")
})
router.get("/:zapId",authMiddleware, (req, res) => {
   console.log("if particular zap is opened give all the axtions and trigeers")
})

export  const zapRouter = router