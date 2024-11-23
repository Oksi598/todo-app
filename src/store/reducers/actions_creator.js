import * as authActions from "./authReducer/actions";
import * as taskActions from "./taskReducer/actions";


const actions = {
    ...authActions,
    ...taskActions

};

export default actions;