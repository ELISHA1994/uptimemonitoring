import http from "http";
import  path from "path";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import {default as logger} from "morgan";
import { default as rfs } from "rotating-file-stream";
import { default as DBG } from "debug";
import { approotdir } from './approotdir.js';
import {basicErrorHandler, handle404, normalizePort, onError, onListening} from "./utils/utils.js";


// Global variables
const __dirname = approotdir;
const debug = DBG('server:debug');
dotenv.config();



// Initialize the express app object
export const app = express();

export const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'common',  {
    stream: process.env.REQUEST_LOG_FILE ?
        rfs.createStream(process.env.REQUEST_LOG_FILE, {
            size: '10M',     // rotate every 10 MegaBytes written
            interval: '1d',  // rotate daily
            compress: 'gzip',
            path: path.join(__dirname, 'logs')
        })
        : process.stdout
}));

// Health Check Route
app.get('/status', function (req, res, net) {
    return res.status(200).json({ msg: 'Server is up and running !'})
});

/**
 * Not Found and Error Middleware
 * @params {Function}
 */
app.use(handle404);
app.use(basicErrorHandler);


export const server = http.createServer(app);
server.listen(port);


server.on('request', (req, res) => {
    // debug(`${new Date().toISOString()} request: ${req.method} ${req.url}`);
})
server.on('error', onError);
server.on('listening', onListening);
