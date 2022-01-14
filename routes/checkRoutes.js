import express from "express";
import validateToken from "../middlewares/auth.js";
import * as checkController from "../controller/checkController.js";
import { validateBody } from "../middlewares/joiSchemaValidation.js";
import {createCheck, updateCheck} from "../schema/checkSchema.js";
import Check from "../database/models/checkModel.js";
import { use } from "../utils/utils.js";

// Router variable
export const router = express.Router();

router.post(
    '/create-check',
    validateToken,
    validateBody(createCheck),
    use(checkController.createcheck)
)

router.get(
    '/:id',
    validateToken,
    use(checkController.getcheck)
);

router.put(
    '/:id',
    validateToken,
    validateBody(updateCheck),
    use(checkController.updatecheck)
)

router.delete(
    '/:id',
    validateToken,
    use(checkController.deletecheck)
)

router.get(
    '/getAllChecks/all',
    validateToken,
    async (req, res) => {
        const checks = await Check.find({});
        res.status(200).json(checks);
    }
)

// router.get(
//     '/test',
//     validateToken,
//     async (req, res) => {
//         const user = await User.findById(req.id);
//         if (!user) {
//             throw new Error(constants.userMessage.USER_NOT_FOUND);
//         }
//         res.status(200).json(user);
//     }
// );