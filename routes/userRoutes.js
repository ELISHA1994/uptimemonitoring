import express from "express";
import { signup, login, updateUser } from "../schema/userSchema.js";
import * as userController from "../controller/userController.js"
import { validateBody } from "../middlewares/joiSchemaValidation.js";
import { use } from "../utils/utils.js";
import validateToken from "../middlewares/auth.js";

// Router variable
export const router = express.Router();

router.post(
    '/signup',
    validateBody(signup),
    use(userController.signup)
);

router.post(
    '/login',
    validateBody(login),
    use(userController.login)
);

router.get(
    '/:phone',
    validateToken,
    use(userController.getUser)
);

router.get(
    '/checksByUser/:phone',
    validateToken,
    use(userController.checksByUser)
)

router.put(
    '/:phone',
    validateToken,
    validateBody(updateUser),
    use(userController.updateUser)
);

router.delete(
    '/:phone',
    validateToken,
    use(userController.deleteUser)
)



