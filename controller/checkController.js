import constants from "../constants/index.js";
import * as checkService from "../service/checkService.js"


export const createcheck = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    req.body.userPhone = req.userPhone;
    console.log("request body", req.body);
    const responseFromService = await checkService.createcheck(req.body);
    response.status = 200;
    response.message = constants.checkMessage.CHECK_CREATED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

export const getcheck = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await checkService.getcheck(req.params);
    response.status = 200;
    response.message = constants.checkMessage.CHECK_FETCHED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

export const updatecheck = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await checkService.updatecheck({
        id: req.params.id,
        updateInfo: req.body
    });
    response.status = 200;
    response.message = constants.checkMessage.CHECK_UPDATED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

export const deletecheck = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await checkService.deletecheck(req.params);
    response.status= 200;
    response.message = constants.checkMessage.CHECK_DELETED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

