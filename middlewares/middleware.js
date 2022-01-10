import cors from "cors";
import express from "express";
import {default as logger} from "morgan";
import {default as rfs} from "rotating-file-stream";
import path from "path";
import { approotdir } from "../approotdir.js";


// Global variables
const __dirname = approotdir;

export default function (app) {
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
}