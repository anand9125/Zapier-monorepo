import express from 'express';
import { zapRouter } from './router/zap';
import { userRouter } from './router/user';
import cors from "cors"
import { triggerRouter } from './router/trigger';
import { actionRouter } from './router/action';
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zaps",zapRouter);

app.use("/api/v1/action",actionRouter);

app.use("/api/v1/trigger",triggerRouter);

app.listen(4000, () => console.log('Server started on port 4000'));