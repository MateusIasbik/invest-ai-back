import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import httpStatus from 'http-status';
import cors from "cors";
import errorHandlingMiddleware from './middlewares/errors-middleware';
import userRouter from './routers/user.router';

const app = express();

app.use(json()); // body-parser
app.use(cors())

app.get('/health', (req: Request, res: Response) => {
  res.status(httpStatus.OK).send("I'm ok!");
});

app.use(userRouter);

app.use(errorHandlingMiddleware);

export default app;