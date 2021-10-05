import "reflect-metadata";
import 'express-async-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import createConnection from './database/index.database';
import { AppError } from "./errors/app_error.error";
import { router } from "./routes/routes";
require('dotenv-safe').config({
    allowEmptyValues: true
});

createConnection();

const app: Express = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError)
        return response.status(err.statusCode).json({ message: err.message })
    return response.status(500).json({
        status: "Error 🛑 ",
        message: `Internal server error ${err.message}`
    })
});

export { app }