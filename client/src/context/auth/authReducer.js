import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';

const authReducer = (state, action) => {
    switch (action.type) {
        // case REGISTER_SUCCESS:
        //     return {
        //         ...state,
        //     };

        default:
            return state;
    }
};

export default authReducer;
