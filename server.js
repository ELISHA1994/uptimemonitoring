import http from "http";
import express from "express";
import dotenv from 'dotenv';
import {basicErrorHandler, handle404, normalizePort, onError, onListening} from "./utils/utils.js";
import connection from "./database/connection.js";
import middleware from "./middlewares/middleware.js";


dotenv.config();



// Initialize the express app object
export const app = express();

// Db connectivity
await connection();

export const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Middlewares
middleware(app);

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
