import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { JWT_PASSWORD } from "../config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { SigninScheme, SigupScheme } from "../types";
const client = new PrismaClient()

export const userSignUp = async(req:Request,res:Response)=>{
    const parseData = SigupScheme.safeParse(req.body)       
    if(!parseData.success){
         res.status(401).json({
            message:"invalid input",
        })
        return;
    }
    const hashPassword = await bcrypt.hash(parseData.data.password,10)
    try{
        const existingUser = await client.user.findUnique({
             where: { email:parseData.data.email } 
        });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" })
            return;
        }
        const user = await client.user.create({
            data: {
                name: parseData.data.name,
                email: parseData.data.email,
                password:  hashPassword,
            },
        })
        const token = jwt.sign({userId :user.id},JWT_PASSWORD)
        res.status(201).json({
            user,
            token
        })
    }   catch(e){
        res.status(500).json({
           mesage:"Internal Server Error"
        })
     }

}



export const userSignIn= async(req:Request,res:Response)=>{
    const parseData = SigninScheme.safeParse(req.body)
    if(!parseData.success){
        res.status(401).json({
            message:"Invalid inputs"
        })
        return;
    }

    try{
          const user = await client.user.findUnique({
             where:{
                 email:parseData.data.email
             }
          })
          if(!user){
              res.status(404).json({
                  message:"User is not found please Signup "
              })
            return;
          }
         const isValid = await bcrypt.compare(parseData.data.password, user.password)
          if(!isValid){
              res.status(401).json({
                 message:"Invalid password"
              })
            return;
          }
          const token = jwt.sign({userId:user.id},JWT_PASSWORD)
          res.json({
              user,
              token
          })
        }
        catch(e){
            res.status(500).json({
                message:"Internal Server Error"
            })
        }
}

export const getUserDetails = async(req:Request,res:Response)=>{
     //TODo:fix the types
        // @ts-ignore
        const id = req.body;
        const user = await client.user.findFirst({
            where:{
                id
            },select:{ 
                name:true,
                email:true
            }
        })
        res.json({
            user
        })
}