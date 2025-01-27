import { PrismaClient } from '@prisma/client';
import {Kafka} from "kafkajs"
const client = new PrismaClient();
const TOPIC_NAME = "zap-evetns"  
const kafka = new Kafka({
    clientId:"outbox-processor",
    brokers: ['localhost:9092'],
});

async function main(){
    const consumer = kafka.consumer({groupId: 'main-worker'})
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })//sub specific topic ki whatever events comming here send it to me
//everytime message is received log it here
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })
      await new Promise(r=>setTimeout(r, 1000))
    },
  })
}
main()