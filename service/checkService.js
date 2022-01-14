import mongoose from "mongoose";
import Check from "../database/models/checkModel.js";
import User from "../database/models/userModel.js";
import { checkObjectId, formatMongoData } from "../middlewares/dbHelper.js";
import constants from "../constants/index.js";

export const createcheck = async (data) => {
    const { protocol, url, method, successCodes, timeoutSeconds, userPhone } = data

    // Transactions
    const session = await mongoose.startSession();
    let newCheck
    await session.withTransaction(async () => {
        // console.log(userPhone);
        const user = await User.findOne({ phone: userPhone });
        // console.log("user creating check",user);

        newCheck = new Check({
            protocol,
            url,
            method,
            successCodes,
            timeoutSeconds,
            userPhone,
            user: user.id
        });

        await newCheck.save();

        user.checks.push(newCheck);
        await user.save();
    });
    await session.endSession();
    return formatMongoData(newCheck);

}

export const getcheck = async ({ id }) => {

    checkObjectId(id);
    let check = await Check.findById(id);
    if (!check) {
        throw new Error(constants.checkMessage.CHECK_NOT_FOUND);
    }
    return formatMongoData(check);
}

export const updatecheck = async ({ id, updateInfo }) => {
    const check = await Check.findOneAndUpdate(
        { id },
        updateInfo,
        { new: true }
    );
    if (!check) {
        throw new Error(constants.checkMessage.CHECK_NOT_FOUND)
    }
    return formatMongoData(check);
}

export const deletecheck = async ({ id }) => {

    // Transactions
    const session = await mongoose.startSession();
    let deletedCheck
    await session.withTransaction(async () => {
        deletedCheck = await Check.findByIdAndDelete(id);

        const _id = deletedCheck.user;
        let user = await User.findById(_id);
        // const index = user.checks.indexOf(id);
        let checks = user.checks;
        const index = checks.indexOf(id);
        checks.splice(index, 1);

        const updateduser = await User.findOneAndUpdate(
            { phone: user.phone },
            {checks},
            { new: true }
        );
        console.log("Updated User Check Array", updateduser.checks);
    });
    console.log(deletedCheck);
    await session.endSession();
    return formatMongoData(deletedCheck);
}
