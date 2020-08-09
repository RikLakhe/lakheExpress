import express from 'express'
import path from 'path'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import indexRouter from "./routes"
import apiRouter from "./routes/api"

import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
    exposedHeaders: 'XSRF-TOKEN',
};

let index = express();

// view engine setup
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'pug');

index.use(
    logger('dev'),
    cors(corsOptions),
    // express.json(),
    // express.urlencoded({extended: false}),
    bodyParser.json({limit: '50mb'}),
    bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}),
    cookieParser(),
    express.static(path.join(__dirname, 'public')),
)

index.use('/', indexRouter);
index.use('/api', apiRouter);

// catch 404 and forward to error handler
index.use(function (req, res, next) {
    next(createError(404));
});

// error handler
index.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || "3001";

index.listen(port, () => {
    console.log(`server running in port : ${port}`,);

    mongoose
        .connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log(`DB Connected Database : ${process.env.MONGODB_DB}`))
        .catch(err => console.log('error', err));
});

export default index;
