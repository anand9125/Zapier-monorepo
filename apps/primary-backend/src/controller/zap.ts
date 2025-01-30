import { Request, Response } from "express";
import { ZapCreateScheme } from "../types";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createZap = async (req: Request, res: Response) => {
    const body = req.body;
    //@ts-ignore
    const id = req.id; //user id
    const parseData = ZapCreateScheme.safeParse(body);

    if (!parseData.success) {
         res.status(400).json({ message: parseData.error });
        return;
    }
    

    try {
      const zapId=  await client.$transaction(async (tx) => {
            //why i have done like this just because one to one realtion prisma is not allowed to create ..
            const zap = await tx.zap.create({
                data: {
                    userId:id,
                    triggerId: "", 
                    actions: {
                        create: parseData.data.actions.map((x, index) => ({
                            AvailableActionId: x.AvailableActionId,
                            sortingOrder: index
                        }))
                    }
                }
            });

            const trigger = await tx.trigger.create({
                data: {
                    availableTriggersId: parseData.data.availableTriggersId,
                    zapId: zap.id
                }
            });

            await tx.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerId: trigger.id
                }
            });
            return zap.id;  //after all transaction we return zap id for further use..
        });

        res.status(201).json({ 
            zapId: zapId
        });
    } catch (error) {
        console.error("Error creating Zap:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllZap = async(req:Request,res:Response)=>{
   //@ts-ignore
   const id = req.id;
   const zaps = await client.zap.findMany({
        where:{
            userId:id
        },
        include:{
            actions:{
                include:{
                    type:true
                }
            },
            trigger:{
              include:{
                    type:true
                }
            }
            
        },
        
   })
    res.json({
    zaps 
    })
}

export const getZapById = async(req:Request,res:Response)=>{
  
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    const zap = await client.zap.findFirst({
        where:{
            id:zapId,
            userId:id
        },
        include:{
            actions:{
                include:{
                    type:true
                }
            },trigger:{
                include:{
                    type:true
                }
            }
        }
        
   })
   res.json({
    zap
   })
}
