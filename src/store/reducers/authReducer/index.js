const initState = {
    user: null,
    isAuth: false,
};

const AuthReducer = (state = initState, action) => {
    switch(action.type) {
        case "SIGN_IN":
            return { ...state, user: action.payload, isAuth: true };
        case "LOGOUT":
            return { ...state, user: null, isAuth: false };
        default:
            return state;
    }
};

export default AuthReducer;