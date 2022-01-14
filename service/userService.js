import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";
import Check from "../database/models/checkModel.js"
import constants from "../constants/index.js";
import {checkObjectId, formatMongoData} from "../middlewares/dbHelper.js";
import mongoose from "mongoose";



export const signup = async (data) => {
    const {
        firstName,
        lastName,
        password,
        phone,
        tosAgreement
    } = data
    const user = await User.findOne({ phone });
    if (user) {
        throw new Error(constants.userMessage.DUPLICATE_PHONE);
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        firstName,
        lastName,
        password: encryptedPassword,
        phone,
        tosAgreement
    });
    const result = await newUser.save();

    // Create Token
    const token = await jwt.sign({ id: result.id, phone }, process.env.SECRET_KEY || 'MY-SECRET-KEY', { expiresIn: '1d'});

    let userObj = formatMongoData(result);
    // Save user token
    userObj.accessToken = token;
    return userObj;
}

export const login = async ({ phone, password }) => {
    const user = await User.findOne({ phone });

    // throw error if user not-found
    if (!user) {
        throw new Error(constants.userMessage.USER_NOT_FOUND);
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error(constants.userMessage.INVALID_PASSWORD);
    }

    // Create Token
    const token = await jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY || 'MY-SECRET-KEY', { expiresIn: '1d'});
    let result = formatMongoData(user);

    // Save user token
    result.accessToken = token;
    return result;
}

export const getUser = async ({ phone }) => {

    let user = await User.findOne({ phone });
    if (!user) {
        throw new Error(constants.userMessage.USER_NOT_FOUND)
    }
    return formatMongoData(user);

}

export const checksByUser = async ({ phone }) => {

    let user = await User.findOne({ phone }).populate('checks');
    if (!user) {
        throw new Error(constants.userMessage.USER_NOT_FOUND)
    }
    return user.checks;
}

export const updateUser = async ({ phone, updateInfo }) => {
    const user = await User.findOneAndUpdate(
        { phone },
        updateInfo,
        { new: true }
    );
    if (!user) {
        throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    return formatMongoData(user);
}

export const deleteUser = async ( { phone } ) => {
    const session = await mongoose.startSession();
    let deletedUser;
    await session.withTransaction(async () => {
        let user = await User.findOne({ phone });
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND)
        }
        checkObjectId(user.id);
        await Check.deleteMany({ user: user.id });
        deletedUser = await User.findByIdAndDelete(user.id);
    });
    await session.endSession();
    return formatMongoData(deletedUser);
}
