import {Router} from  "express"
import { authMiddleware } from "../Middlewares/middlewares";
import { PrismaClient } from '@prisma/client';
import { userSignIn, userSignUp ,getUserDetails} from "../controller/user";


const client = new PrismaClient()
const router = Router();

router.get("/available" ,async (req, res) => {
    const availableTriggers = await client.availableTriggers.findMany({})
    res.json({
        availableTriggers
    })   
}) 
  


export const triggerRouter = router;