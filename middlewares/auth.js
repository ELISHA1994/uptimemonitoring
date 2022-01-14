import jwt from "jsonwebtoken";
import constants from "../constants/index.js";

export default async function validateToken(req, res, next) {
    console.log('validate token');
    let response = {...constants.defaultServerResponse};
    try {
        const token = req.headers.authorization.split('Bearer')[1].trim();
        if (!token) {
            throw new Error(constants.requestValidationMessage.TOKEN_MISSING)
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY || 'MY-SECRET-KEY')
        req.id = decoded.id;
        req.userPhone = decoded.phone
        return next();
    } catch (error) {
        console.log('Error', error);
        response.message = error.message;
        response.status = 401;
    }
    return res.status(response.status).send(response);
}