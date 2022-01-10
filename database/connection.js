import mongoose from 'mongoose';
import { default as DBG } from "debug";

const debug = DBG('server:debug');
const error = DBG('server:error');


export default async function () {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        debug("Database Connected");
    } catch (err) {
        error("Database connectivity error", err);
        throw new Error(err);
    }
}