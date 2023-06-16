import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import favicon from 'serve-favicon';
// import helmet from "helmet";

import router from './router/router.js';
import errorHandler from "./error/errorHandler.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log('Mongoose DB connected...'))
    .catch((err) => console.log('DB Error:', err))

const app = express();

app.use(cors());
// app.use(helmet());
app.use(express.json());

app.use('/', express.static('src/views'));
app.use('/api/image', express.static('uploads'));

const __dirname = path.resolve();
app.use(favicon(path.join(__dirname, 'src/views', 'favicon.ico')));

app.use('/api', router);
app.use(errorHandler);

const PORT = process.env.PORT || 4005;
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`Server has been started on port ${PORT}...`)
});