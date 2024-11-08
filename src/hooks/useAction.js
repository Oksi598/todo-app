import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import actions from "../store/reducers/actions_creator.js";

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};