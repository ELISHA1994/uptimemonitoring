import express from "express";
import { signup, login, updateUser } from "../schema/userSchema.js";
import * as userController from "../controller/userController.js"
import { validateBody } from "../middlewares/joiSchemaValidation.js";
import validateToken from "../middlewares/auth.js";

// Router variable
export const router = express.Router();

router.post(
    '/signup',
    validateBody(signup),
    userController.signup
);

router.post(
    '/login',
    validateBody(login),
    userController.login
);

router.get(
    '/:phone',
    validateToken,
    userController.getUser
);

router.put(
    '/:phone',
    validateToken,
    validateBody(updateUser),
    userController.updateUser
);

router.delete(
    '/:phone',
    validateToken,
    userController.deleteUser
)



