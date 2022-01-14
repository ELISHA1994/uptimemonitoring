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
        USER_CHECK_FETCH: 'User Checks Fetched Successfully',
        USER_UPDATED: 'User Updated Successfully',
        USER_DELETED: 'User Deleted Successfully'
    },

    checkMessage: {
        CHECK_CREATED: 'Check Created Successfully',
        CHECK_FETCHED: 'Check Fetched Successfully',
        CHECK_UPDATED: 'Check Updated Successfully',
        CHECK_DELETED: 'Check Deleted Successfully',
        CHECK_NOT_FOUND: 'Check Not Found'
    },

    requestValidationMessage: {
        BAD_REQUEST: 'Invalid fields',
        TOKEN_MISSING: 'AccessToken Missing'
    },

    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    }
}