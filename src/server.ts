import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'Error',
                message: err.message,
            })
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        })
    }
);

app.listen(3334, () =>{
    console.log('Server started on port 3334');
})
