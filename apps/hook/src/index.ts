import express from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();

const client = new PrismaClient();
app.use(express.json())

app.post("/hooks/catch/:userId/:zapId", async(req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body =req.body;
    //store om db a new trigger 
    await client.$transaction(async ts=>{
        const run = await client.zapRun.create({
            data:{
                zapId: zapId,
                runTime:new Date(),
                metadata: body
            }
        });      
        await client.zapRunOutbox.create({
            data:{
                zapRunId:run.id
            }
        })  
    })
    res.json({
        messsage:"Webhooks recieved"
    })
    //push it on the queue (kafka/redis)

})
app.listen(3000)