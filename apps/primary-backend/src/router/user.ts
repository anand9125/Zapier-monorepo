import {Router} from  "express"
import { authMiddleware } from "../Middlewares/middlewares";
import { PrismaClient } from '@prisma/client';
import { userSignIn, userSignUp ,getUserDetails} from "../controller/user";

const router = Router();
const client = new PrismaClient();

router.post("/signup", userSignUp)


router.post("/signin", userSignIn)

router.get("/user", authMiddleware, getUserDetails)


export  const userRouter = router

