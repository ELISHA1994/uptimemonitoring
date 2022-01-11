export default {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },

    userMessage: {
        SIGNUP_SUCCESS: 'Signup Success',
        LOGIN_SUCCESS: 'Login Success',
        DUPLICATE_PHONE: 'User already exist with given phone number',
        USER_NOT_FOUND: 'User not found',
        INVALID_PASSWORD: 'Incorrect Password',
        USER_FETCH: 'User Fetched Successfully',
        USER_UPDATED: 'User Updated Successfully',
        USER_DELETED: 'User Deleted Successfully'
    },

    requestValidationMessage: {
        BAD_REQUEST: 'Invalid fields',
        TOKEN_MISSING: 'AccessToken Missing'
    },

    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    }
}