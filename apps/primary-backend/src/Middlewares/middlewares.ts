import {NextFunction,Request,Response} from "express"
import jwt  from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";


export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token  = req.headers.authorization ;
    if(!token){
        return res.status(401).json({message:"Token required"})

    }
    const payload = jwt.verify(token,JWT_PASSWORD)
   if(payload){
    //@ts-ignore
    req.id = payload.id;
    next();
   }
}