import { PrismaClient } from '@prisma/client';
import {Kafka} from "kafkajs"
const client = new PrismaClient();
const TOPIC_NAME = "zap-evetns"  
const kafka = new Kafka({
    clientId:"outbox-processor",
    brokers: ['localhost:9092'],
});

async function main() {
    const producer = kafka.producer(); //  Kafka producer is a component of Apache Kafka.It is responsible for sending (or "producing") messages to Kafka topics.
    await producer.connect();
    while(1){
        const penddingRows = await client.zapRunOutbox.findMany({
            where:{},
            take:10

        })
       producer.send({  //send out the kafka
        topic: TOPIC_NAME,
        messages: penddingRows.map(r=>({value:r.zapRunId})),  //in kafka quesues goes what is value that we are trying to send
       })
       await client.zapRunOutbox.deleteMany({
        where:{
            id:{
                in:penddingRows.map(r=>r.id)
            }
        }
       })
       }
}
main();