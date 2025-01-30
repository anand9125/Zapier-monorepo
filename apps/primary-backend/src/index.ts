import express from 'express';
import { zapRouter } from './router/zap';
import { userRouter } from './router/user';
import cors from "cors"
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/zap",zapRouter);

app.listen(3000, () => console.log('Server started on port 3000'));