import {Router} from  "express"
import { authMiddleware } from "../Middlewares/middlewares";
import { PrismaClient } from '@prisma/client';
import { userSignIn, userSignUp ,getUserDetails} from "../controller/user";
  
const client = new PrismaClient();

const router = Router();

router.get("/available" , async(req, res) => {
    const availableActions =await client.availableAction.findMany({})
    res.json({
        availableActions
    })
})


export const actionRouter = router;