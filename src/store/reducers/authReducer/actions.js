import { jwtDecode } from "jwt-decode";
import http from "../../../http_common";

export const signInByToken = (token) => async (dispatch) => {
    const user = saveToken(token);

    dispatch({ type: "SIGN_IN", payload: user });
};

const saveToken = (token) => {
    if(token === null || token === undefined) {
        return null;
    }

    localStorage.setItem("auth", token);
    
    const decodedToken = jwtDecode(token);

    const user = {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role
    };

    return user;
}

export const signIn = (model) => async (dispatch) => {
    try {        
        const response = await http.post("account/signin", model);      
        const { data } = response;
        const tokens = data.payload;
        const user = saveToken(tokens.accessToken);
        localStorage.setItem("urt", tokens.refreshToken);

        dispatch({ type: "SIGN_IN", payload: user });

        return { success: true, message: data.message };
    } catch (error) {        
        return { success: false, message: error.response.data.message };
    }
};

export const signUp = (model) => async (dispatch) => {
    try {        
        const response = await http.post("account/signup", model);      
        const { data } = response;
        const tokens = data.payload;
        const user = saveToken(tokens.accessToken);
        localStorage.setItem("urt", tokens.refreshToken);

        dispatch({ type: "SIGN_UP", payload: user });

        return { success: true, message: data.message };
    } catch (error) {        
        return { success: false, message: error.response.data.message };
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("urt");
    dispatch({ type: "LOGOUT" });
};