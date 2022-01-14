import constants from "../constants/index.js";
import * as userService from "../service/userService.js";


export const signup = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await userService.signup(req.body);
    response.status = 200;
    response.message = constants.userMessage.SIGNUP_SUCCESS;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

export const login = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await userService.login(req.body);
    response.status = 200;
    response.message = constants.userMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
    console.log(response.body);

    return res.status(response.status).json(response);
}

export const getUser = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await userService.getUser(req.params);
    response.status = 200;
    response.message = constants.userMessage.USER_FETCH;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

// ToDo: 'test this handler after completely creating the checks module'
export const checksByUser = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await userService.checksByUser(req.params);
    response.status = 200;
    response.message = constants.userMessage.USER_CHECK_FETCH;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

export const updateUser = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await userService.updateUser({
        phone: req.params.phone,
        updateInfo: req.body
    });
    response.status = 200;
    response.message = constants.userMessage.USER_UPDATED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

export const deleteUser = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await userService.deleteUser(req.params);
    response.status = 200;
    response.message = constants.userMessage.USER_DELETED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}