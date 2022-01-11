import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";
import constants from "../constants/index.js";
import {checkObjectId, formatMongoData} from "../middlewares/dbHelper.js";



export const signup = async function (data) {
    const {
        firstName,
        lastName,
        password,
        phone,
        tosAgreement
    } = data
    try {

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
        const result = await newUser.save()

        // Create Token
        const token = await jwt.sign({ id: result.id, phone }, process.env.SECRET_KEY || 'MY-SECRET-KEY', { expiresIn: '1d'});

        let userObj = formatMongoData(result);
        // Save user token
        userObj.accessToken = token;
        return userObj

    } catch (error) {
        console.log('Something went wrong: Service: signup', error);
        throw new Error(error);
    }
}

export const login = async ({ phone, password }) => {
  try {
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
  } catch (error) {
      console.log('Something went wrong: Service: login', error);
      throw new Error(error);
  }
}

export const getUser = async ({ phone }) => {
    try {
        let user = await User.findOne({ phone });
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND)
        }
        return formatMongoData(user);
    } catch (error) {
        console.log('Something went wrong: Service: getUser', error);
        throw new Error(error);
    }
}

export const updateUser = async ({ phone, updateInfo }) => {
    try {
        const user = await User.findOneAndUpdate(
            { phone },
            updateInfo,
            { new: true }
        );
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        return formatMongoData(user);
    } catch (error) {
        console.log('Something went wrong: Service: updateUser', error);
        throw new Error(error);
    }
}

export const deleteUser = async ( { phone } ) => {
    try {
        let user = await User.findOne({ phone });
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND)
        }
        console.log(user.id);
        checkObjectId(user.id)
        const deletedUser = await User.findByIdAndDelete(user.id);
        return formatMongoData(deletedUser);
    } catch (error) {
        console.log('Something went wrong: Service: deleteUser', error);
        throw new Error(error);
    }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGRhZmI4MDllOGM1MWM5YzQxYjZmYyIsInBob25lIjoiNzA2NjUxMzAxMCIsImlhdCI6MTY0MTkyNzY0OSwiZXhwIjoxNjQyMDE0MDQ5fQ.45A63HmNzLWr3C3w8uNuA3bOvRsQ9V3lj2umlmrYYzs